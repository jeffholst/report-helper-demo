const UPSTREAM_BASE_URL = 'https://ai-api.harriscomputer.io'

function getRequestBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined
  }

  if (!req.body) {
    return undefined
  }

  if (typeof req.body === 'string') {
    return req.body
  }

  return JSON.stringify(req.body)
}

export default async function handler(req, res) {
  try {
    // Reconstruct the path from the original URL
    const upstreamUrl = new URL(req.url, UPSTREAM_BASE_URL)

    const headers = {}

    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization
    }

    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type']
    }

    const upstreamResponse = await fetch(upstreamUrl.toString(), {
      method: req.method,
      headers,
      body: getRequestBody(req)
    })

    const rawBody = await upstreamResponse.text()
    const contentType = upstreamResponse.headers.get('content-type')

    if (contentType) {
      res.setHeader('Content-Type', contentType)
    }

    res.status(upstreamResponse.status).send(rawBody)
  } catch (error) {
    res.status(502).json({
      error: 'Failed to reach upstream reports API',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
