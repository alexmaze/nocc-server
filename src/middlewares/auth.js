import { User } from '../models/user.js'

export function auth(req, res, next) {
  if (req.method !== 'GET') {
    if (req.session.user === undefined || req.session.user.role !== 'admin') {
      res.status(403).end()
    }
  }
  next()
}
