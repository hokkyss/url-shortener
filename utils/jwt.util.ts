import type { Request } from 'express'

import * as jose from 'jose'

import envConfig from '../config/env.config'
import jwtConfig from '../config/jwt.config'

export const extractJwtFromHeader = (req: Request): null | string => {
  const headerRegex = /^(Bearer)\s(\S+)$/g

  const authorization = req.headers.authorization

  if (!authorization) {
    return null
  }

  const match = authorization.match(headerRegex)
  if (!match) {
    return null
  }

  return match[2]
}

export const sign = async (payload: Record<string, unknown>) => {
  const secretKey = new TextEncoder().encode(envConfig.secretKey)

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(jwtConfig.issuer)
    .setAudience(jwtConfig.audience)
    .setExpirationTime('1h')
    .sign(secretKey)

  return jwt
}

export const verify = async <T extends Record<string, unknown>>(
  jwt: string
): Promise<T | null> => {
  const secret = new TextEncoder().encode(envConfig.secretKey)

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
    })

    return payload as T
  } catch {
    return null
  }
}
