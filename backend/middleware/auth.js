const jwt = require('jsonwebtoken');

function getJwtSecret() {
  // In production you must set JWT_SECRET.
  return process.env.JWT_SECRET || 'dev-insecure-secret-change-me';
}

function authRequired(req, res, next) {
  const header = req.header('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(match[1], getJwtSecret());
    req.user = {
      id: Number(payload.sub),
      email: payload.email,
    };
    if (!Number.isFinite(req.user.id)) return res.status(401).json({ error: 'Unauthorized' });
    return next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { authRequired };
