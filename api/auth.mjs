const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : null

const MAX_REQUEST_BODY = 1024 * 100 // 100 KB
const MAX_MESSAGES = 50
const MAX_MESSAGE_CONTENT = 4000
const VALID_ROLES = new Set(['system', 'user', 'assistant'])

export function setSecurityHeaders(res, origin) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Cache-Control', 'no-store')
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
}

export function validateMethod(req, res, allowed = 'POST') {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return false
  }
  if (req.method !== allowed) {
    res.status(405).json({ error: 'Method not allowed' })
    return false
  }
  return true
}

export function validateOrigin(req, res) {
  if (!ALLOWED_ORIGINS) return true
  const origin = req.headers.origin || req.headers.referer
  if (!origin) return true
  const allowed = ALLOWED_ORIGINS.some((o) => origin.startsWith(o))
  if (!allowed) {
    res.status(403).json({ error: 'Origin not allowed' })
    return false
  }
  return true
}

export function validateApiKey(res) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.status(503).json({
      error: 'AI service is not configured',
    })
    return null
  }
  return apiKey
}

export function validateBodySize(req, res) {
  const contentLength = parseInt(req.headers['content-length'] || '0', 10)
  if (contentLength > MAX_REQUEST_BODY) {
    res.status(413).json({ error: 'Request body too large' })
    return false
  }
  return true
}

export async function parseBody(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Request body is required' })
      return null
    }
    return req.body
  } catch {
    res.status(400).json({ error: 'Malformed request body' })
    return null
  }
}

export function validateMessages(body, res) {
  const { messages } = body

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'messages array is required' })
    return false
  }

  if (messages.length === 0) {
    res.status(400).json({ error: 'messages array must not be empty' })
    return false
  }

  if (messages.length > MAX_MESSAGES) {
    res.status(400).json({ error: `messages array exceeds maximum of ${MAX_MESSAGES} items` })
    return false
  }

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    if (!msg || typeof msg !== 'object') {
      res.status(400).json({ error: `messages[${i}] must be an object` })
      return false
    }
    if (!msg.role || !VALID_ROLES.has(msg.role)) {
      res.status(400).json({ error: `messages[${i}].role must be one of: system, user, assistant` })
      return false
    }
    if (typeof msg.content !== 'string') {
      res.status(400).json({ error: `messages[${i}].content must be a string` })
      return false
    }
    if (msg.content.length > MAX_MESSAGE_CONTENT) {
      res.status(400).json({ error: `messages[${i}].content exceeds maximum length of ${MAX_MESSAGE_CONTENT}` })
      return false
    }
  }

  return true
}

export async function verifySupabaseAuth(req) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, user: null, role: 'guest' }
  }

  const token = authHeader.slice(7)
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('SUPABASE_URL or SUPABASE_ANON_KEY not set — auth verification skipped')
    return { authenticated: false, user: null, role: 'guest' }
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseAnonKey,
      },
    })

    if (!response.ok) {
      return { authenticated: false, user: null, role: 'guest' }
    }

    const userData = await response.json()
    const userId = userData?.id
    if (!userId) {
      return { authenticated: false, user: null, role: 'guest' }
    }

    let role = 'guest'
    try {
      const profileResponse = await fetch(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=role&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apikey: supabaseAnonKey,
          },
        }
      )
      if (profileResponse.ok) {
        const profiles = await profileResponse.json()
        if (profiles?.[0]?.role) {
          role = profiles[0].role
        }
      }
    } catch {
      // Profile fetch failed — default to guest
    }

    return { authenticated: true, user: { id: userId }, role }
  } catch {
    return { authenticated: false, user: null, role: 'guest' }
  }
}

export function enforceAuthForPersonalized(authResult, body, res) {
  const { role } = body
  const personalizedRoles = ['buyer', 'seller', 'admin']

  if (personalizedRoles.includes(role) && !authResult.authenticated) {
    res.status(401).json({ error: 'Authentication required for personalized features' })
    return false
  }

  return true
}
