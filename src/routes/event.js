import express from 'express'
import { Event } from '../models/event'
import { pageQuery } from '../utils/db-utils'

let router = express.Router()

router.post('/', (req, res) => {
  let event = new Event(req.body)
  event.created = new Date()
  event.save(err => {
    if (err) {
      res.status(500).json(err)
      return
    }
    res.json(event)
  })
})

router.patch('/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    Object.assign(event, req.body)
    event.save(err => {
      if (err) {
        res.status(500).json(err)
        return
      }
      res.json(event)
    })
  })
})

router.get('/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.json(event)
  })
})

router.delete('/:id', (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).end()
  })
})

router.get('/', (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1
  const size = parseInt(req.query.size, 10)

  if (!size) {
    Event.find().exec((err, events) => {
      if (err) {
        res.status(500).json(err)
        return
      }
      res.json(events)
    })
  } else {
    pageQuery(page, size, Event, undefined, {}, { created: 'desc' }, (err, $page) => {
      res.json($page)
    })
  }
})

export default router
