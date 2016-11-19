import express from 'express'
import { User } from '../models/user.js'

let router = express.Router()

/**
 * 新建用户
 */
router.post('/', (req, res) => {
  console.log('create user', req.body)
  let newUser = new User(req.body)
  newUser.created = new Date()
  newUser.save(err => {
    if (err) {
      res.status(500).json(err)
      return
    }
    res.json(newUser._id)
  })
})

/**
 * 更新用户
 * * 支持部分更新，_id 为必填
 */
router.patch('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    let updatedUser = req.body
    updatedUser.password = user.password
    updatedUser._id = user._id

    User.update(updatedUser, (err, user) => {
      if (err) {
        res.status(500).json(err)
      }
      updatedUser.password = undefined
      res.json(updatedUser)
    })
  })
})

/**
 * 获取用户
 */
router.get('/:id', (req, res) => {
  console.log('find user', req.params.id)
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    user.password = undefined
    res.json(user)
  })
})

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).end()
  })
})

/**
 * 获取用户列表
 */
router.get('/', (req, res) => {
  console.log('find users, changed!')
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).json(err)
      return
    }
    users.forEach(user => {
      user.password = undefined
    })
    res.json(users)
  })
})

export default router
