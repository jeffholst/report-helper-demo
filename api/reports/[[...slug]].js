const UPSTREAM_BASE_URL = 'https://ai-api.harriscomputer.io/api/reports'

function buildUpstreamUrl(req) {
  const slug = Array.isArray(req.query.slug)
    ? req.query.slug.filter(Boolean)
    : req.query.slug
      ? [req.query.slug]
      : []

  const upstreamUrl = new URL(`${UPSTREAM_BASE_URL}/${slug.join('/')}`.replace(/\/$/, ''))

  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'slug') {
      continue
    }
    if (Array.isArray(value)) {
      value.forEach((item) => upstreamUrl.searchParams.append(key, item))
    } else if (value !== undefined) {
      upstreamUrl.searchParams.append(key, value)
    }
  }

  return upstreamUrl.toString()
}

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
    const upstreamUrl = buildUpstreamUrl(req)
    const headers = {}

    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization
    }

    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type']
    }

    const upstreamResponse = await fetch(upstreamUrl, {
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