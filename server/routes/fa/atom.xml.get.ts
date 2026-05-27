import { defineFeedRoute } from '~~/server/utils/feed'

export default defineEventHandler(event => defineFeedRoute(event, 'fa', 'atom'))
