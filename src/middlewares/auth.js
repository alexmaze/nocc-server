import { User } from '../models/user.js'

export default function auth(req, res, next) {
  console.log(req.session)
}
