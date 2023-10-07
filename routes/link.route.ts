import express from 'express'

import linkController from '../controllers/link.controller'

const linkRoute = express.Router({
  caseSensitive: true,
  strict: true,
})

linkRoute.get('/:linkId', linkController.getLink)

export default linkRoute
