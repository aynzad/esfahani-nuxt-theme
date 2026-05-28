import { createHash } from 'node:crypto'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText, Output } from 'ai'
import { z } from 'zod'

interface TranslateOptions {
  apiKey: string
  model: string
}

// Keyed by source text, so unchanged strings are never re-translated.
const cacheKey = (text: string) =>
  `gemini:fa:${createHash('sha1').update(text).digest('hex')}`

const translationSchema = z.object({
  translations: z
    .array(z.string())
    .describe(
      'Persian translations, in the same order and with the same count as the input array',
    ),
})

// Throws on any failure so the caller can fall back to the original English text.
async function callGemini(
  texts: string[],
  { apiKey, model }: TranslateOptions,
): Promise<string[]> {
  const google = createGoogleGenerativeAI({ apiKey })

  const { output } = await generateText({
    model: google(model),
    temperature: 0.2,
    // Disable Gemini 2.5 "thinking" — translation needs none, and it adds many seconds of latency
    // (caused the Vercel 10s function timeout on /fa/projects).
    providerOptions: { google: { thinkingConfig: { thinkingBudget: 0 } } },
    output: Output.object({ schema: translationSchema }),
    prompt: [
      'Translate each string in the following JSON array from English to natural, fluent Persian (Farsi).',
      'Transliterate technical terms, library names, and brand names phonetically into Persian script',
      '(for example: "Next.js" -> "نکست جی اس", "Vercel" -> "ورسل", "JavaScript" -> "جاوااسکریپت").',
      'Return the translations in the same order and with the same count as the input.',
      '',
      JSON.stringify(texts),
    ].join('\n'),
  })

  if (output.translations.length !== texts.length) {
    throw new Error(
      'Gemini returned a different number of translations than requested',
    )
  }
  return output.translations
}

// Caches per source string; empty strings pass through, and any failure falls back to English.
export async function translateToFarsi(
  texts: string[],
  options: TranslateOptions,
): Promise<string[]> {
  const storage = useStorage('translations')
  const unique = [...new Set(texts.filter((text) => text.trim().length > 0))]

  const resolved = new Map<string, string>()
  const misses: string[] = []
  await Promise.all(
    unique.map(async (text) => {
      const cached = await storage.getItem<string>(cacheKey(text))
      if (typeof cached === 'string') resolved.set(text, cached)
      else misses.push(text)
    }),
  )

  if (misses.length > 0) {
    try {
      const translated = await callGemini(misses, options)
      await Promise.all(
        misses.map(async (text, index) => {
          resolved.set(text, translated[index]!)
          await storage.setItem(cacheKey(text), translated[index]!)
        }),
      )
    } catch {
      // Leave misses untranslated; they fall back to the original English below.
    }
  }

  return texts.map((text) =>
    text.trim() ? (resolved.get(text) ?? text) : text,
  )
}
