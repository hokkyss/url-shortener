import type { NextFunction, Request, Response } from 'express'

import cors from 'cors'
import express from 'express'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import ErrorCodes from '../constants/error.constant'
import linkRoute from '../routes/link.route'
import loggerService from '../services/logger.service'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use((_req, res, next) => {
  res
    .header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept')
    .header('Content-type', 'application/json')
  next()
})
app.set('json spaces', 2)

app.use((req, _res, next) => {
  loggerService.info(req.path)
  return next()
})

// #region ROUTES
app.use(linkRoute)
// #endregion

// #region NOT-FOUND handler
app.use('*', (_req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: ErrorCodes.NotFound })
})
// #endregion

app.use(
  async (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    loggerService.error(err)
    if (createHttpError.isHttpError(err)) {
      return res.status(err.statusCode).json({ message: err.message })
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorCodes.InternalServerError })
  }
)

export default app
