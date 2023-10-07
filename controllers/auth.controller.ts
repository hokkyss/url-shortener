import type { RequestHandler } from 'express'

import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

import ErrorCodes from '../constants/error.constant'

class AuthController {
  private signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  public signIn: RequestHandler<
    unknown,
    { token: string },
    z.infer<typeof this.signInSchema>
  > = async (req, res) => {
    const parsedBody = this.signInSchema.safeParse(req.body)

    if (!parsedBody.success) {
      throw createHttpError.BadRequest(ErrorCodes.InvalidCredentials)
    }

    return res.status(StatusCodes.OK).json({ token: 'createdtoken' })
  }
}

export default new AuthController()
