import { GRAPHQL_POST } from '@payloadcms/next/routes'
import config from '@payload-config'

export const POST = (req: Request) => GRAPHQL_POST(req, config)
