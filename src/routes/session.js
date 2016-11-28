import express from 'express'
import { User } from '../models/user.js'

let router = express.Router()

// 登录
router.put('/', (req, res) => {
  if (!req.body || !req.body.name || !req.body.password) {
    return res.status(403).end()
  }
  User.find({ name: req.body.name, password: req.body.password }).exec().then(users => {
    if (users && users[0] && users[0].role === 'admin') {
      req.session.user = users[0]
      users[0].password = undefined
      return res.json(users[0])
    } else {
      return res.status(403).end()
    }
  }, err => {
    return res.json(err)
  })
})

router.delete('/', (req, res) => {
  req.session.user = undefined
  return res.status(200).end()
})

router.patch('/', (req, res) => {
  let opUser = req.session.user
  if (req.query.password) {
    // 修改密码
    User.findById(opUser._id, (err, user) => {
      if (err) {
        return res.status(404).json(err)
      }

      user._id = opUser._id
      if (user.password === req.body.old) {
        user.password = req.body.new
        User.update(user, (err) => {
          if (err) {
            return res.status(500).json(err)
          }
          return res.status(200).end()
        })
      }
    })
  }
})

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user)
  } else {
    return res.status(401).end()
  }
})

export default router
