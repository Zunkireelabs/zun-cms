import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'
import config from '@payload-config'

export const GET = (req: Request) => GRAPHQL_PLAYGROUND_GET(req, config)
