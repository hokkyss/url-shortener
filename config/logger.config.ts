import type { LoggerOptions } from 'winston'

import path from 'node:path'
import { format, transports } from 'winston'

const loggerConfig: LoggerOptions = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.resolve(__dirname, '..', 'logs', 'errors.txt'),
      level: 'error',
    }),
    new transports.File({
      filename: path.resolve(__dirname, '..', 'logs', 'infos.txt'),
    }),
  ],
}

export default loggerConfig
