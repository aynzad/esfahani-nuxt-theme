import { defineFeedRoute } from '~~/server/utils/feed'

export default defineEventHandler(event => defineFeedRoute(event, 'en', 'rss'))
