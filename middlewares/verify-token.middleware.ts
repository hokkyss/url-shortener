import type { RequestHandler } from 'express'

import createHttpError from 'http-errors'

import ErrorCodes from '../constants/error.constant'
import { extractJwtFromHeader, verify } from '../utils/jwt.util'

const verifyToken: RequestHandler = async (req, res, next) => {
  const jwt = extractJwtFromHeader(req)

  if (!jwt) {
    throw new createHttpError.Unauthorized(ErrorCodes.Unauthorized)
  }

  const payload = await verify(jwt)
  if (!payload) {
    throw new createHttpError.Unauthorized(ErrorCodes.Unauthorized)
  }

  req.user = payload

  next()
}

export default verifyToken
