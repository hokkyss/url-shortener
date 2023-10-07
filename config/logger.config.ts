import type { LoggerOptions } from 'winston'

import { format, transports } from 'winston'

const loggerConfig: LoggerOptions = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.json(),
        format.prettyPrint(),
        format.timestamp()
      ),
    }),
  ],
}

export default loggerConfig
