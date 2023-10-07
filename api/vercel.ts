import type { VercelApiHandler } from '@vercel/node'

import app from '../app/app'

const handler: VercelApiHandler = async (req, res) => await app(req, res)

export default handler
