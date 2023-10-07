import type { VercelApiHandler } from '@vercel/node'

import app from '../server'

const handler: VercelApiHandler = async (req, res) => await app(req, res)

export default handler
