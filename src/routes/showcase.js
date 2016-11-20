import express from 'express'
import { Mission } from '../models/showcase'

let router = express.Router()

let recordId

// 初始化
Mission.find((err, old) => {
  if (!old || old.length == 0) {
    let showcase = new Mission({
      images: []
    })
    showcase.save((err, s) => {
      if (err) {
        throw '初始化 showcase 失败'
      }
      recordId = s._id
      console.log('Showcase Id', recordId)
    })
  } else {
    recordId = old[0]._id
    console.log('Old Showcase Id', recordId)
  }
})

router.patch('/', (req, res) => {
  Mission.findById(recordId, (err, record) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    Object.assign(record, req.body)
    record.save(err => {
      if (err) {
        res.status(500).json(err)
        return
      }
      res.json(record)
    })
  })
})

router.get('/', (req, res) => {
  Mission.findById(recordId, (err, event) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.json(event)
  })
})

export default router
