import express from 'express'
import { Lab } from '../models/lab'

let router = express.Router()

let recordId

// 初始化
Lab.find((err, old) => {
  if (!old || old.length == 0) {
    let lab = new Lab({
      images: []
    })
    lab.save((err, s) => {
      if (err) {
        throw '初始化 lab 失败'
      }
      recordId = s._id
      console.log('Lab Id', recordId)
    })
  } else {
    recordId = old[0]._id
    console.log('Old Lab Id', recordId)
  }
})

router.patch('/', (req, res) => {
  Lab.findById(recordId, (err, record) => {
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
  Lab.findById(recordId, (err, event) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.json(event)
  })
})

export default router
