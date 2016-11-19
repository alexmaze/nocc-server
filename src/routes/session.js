import express from 'express'
import { User } from '../models/user.js'

let router = express.Router()

// 登录
router.post('/', (req, res) => {
  if (!req.body || !req.body.name || !req.body.password) {
    res.status(403).end()
  }
  User.find({ name: req.body.name, password: req.body.password }).exec().then(users => {
    if (users && users[0]) {
      req.session.user = users[0]
      users[0].password = undefined
      res.json(users[0])
    } else {
      res.status(403).end()
    }
  }, err => {
    res.json(err)
  })
})

router.delete('/', (req, res) => {
  req.session.user = undefined
  res.status(200).end()
})

export default router
