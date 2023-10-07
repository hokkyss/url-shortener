import type { NextFunction, Request, Response } from 'express'

import cors from 'cors'
import express from 'express'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import envConfig from './config/env.config'
import ErrorCodes from './constants/error.constant'
import authRoute from './routes/auth.route'
import loggerService from './services/logger.service'

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

app.use('api/v1/auth', authRoute)

app.use('*', (_req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ details: ErrorCodes.NotFound })
})

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  loggerService.error(err)
  if (createHttpError.isHttpError(err)) {
    return res.status(err.statusCode).json({ details: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ details: ErrorCodes.InternalServerError })
})

app.listen(envConfig.port)

export default app
