import type { RequestHandler } from 'express'

import type { FirebaseService } from '../services/firebase.service'
import type { ILoggerService } from '../services/logger.service'

import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import ErrorCodes from '../constants/error.constant'
import firebaseService from '../services/firebase.service'
import loggerService from '../services/logger.service'

class LinkController {
  public getLink: RequestHandler<{ linkId: string }> = async (
    req,
    res,
    next
  ) => {
    const linkId = req.params.linkId

    const link = await this.firebaseService.getLink(linkId)

    if (!link.exists()) {
      return next(createHttpError.NotFound(ErrorCodes.LinkNotFound))
    }

    // NOTE: this write is insignificant
    this.firebaseService
      .visitLink(linkId)
      .catch((err) => this.loggerService.error(err))

    return res.status(StatusCodes.PERMANENT_REDIRECT).redirect(link.data().to)
  }

  public constructor(
    private firebaseService: FirebaseService,
    private loggerService: ILoggerService
  ) {}
}

export default new LinkController(firebaseService, loggerService)
