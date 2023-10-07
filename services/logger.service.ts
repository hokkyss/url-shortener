import winston, { format, transports } from 'winston'

import envConfig from '../config/env.config'
import loggerConfig from '../config/logger.config'

const loggerService = winston.createLogger(loggerConfig)

if (envConfig.dev) {
  loggerService.add(
    new transports.Console({
      format: format.combine(
        format.prettyPrint(),
        format.colorize({
          all: true,
        }),
        format.timestamp()
      ),
    })
  )
}

export interface ILoggerService {
  debug: (message: unknown) => void
  error: (message: unknown) => void
  info: (message: unknown) => void
  warn: (message: unknown) => void
}

export default loggerService
