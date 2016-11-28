import express from 'express'
import { Event } from '../models/event'
import { pageQuery } from '../utils/db-utils'

let router = express.Router()

router.post('/', (req, res) => {
  let event = new Event(req.body)
  event.created = new Date()
  event.save(err => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.json(event)
  })
})

router.patch('/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      return res.status(404).json(err)
    }
    Object.assign(event, req.body)
    event.save(err => {
      if (err) {
        return res.status(500).json(err)
      }
      return res.json(event)
    })
  })
})

router.get('/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      return res.status(404).json(err)
    }
    return res.json(event)
  })
})

router.delete('/:id', (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(404).json(err)
    }
    return res.status(200).end()
  })
})

router.get('/', (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1
  const perpage = parseInt(req.query.perpage, 10)

  let type = req.query.type
  if (type) {
    type = parseInt(type, 10)
  }
  if (type === 0) {
    console.log('0 forum')
  } else if (type === 1) {
    console.log('1 lecture ')
  } else if (type === 2) {
    console.log('2 workshop')
  } else if (type === 10) {
    console.log('10 lab')
  }
  if (!perpage) {
    let query = {}
    if (type != undefined) {
      query.type = type
    }
    Event.find(query).exec((err, events) => {
      // throw new Error('error lala')
      if (err) {
        return res.status(500).json(err)
      }
      return res.json(events)
    })
  } else {
    let query = {}
    if (type != undefined) {
      query.type = type
    }
    pageQuery(page, perpage, Event, undefined, query, { created: 'desc' }, (err, $page) => {
      return res.json($page)
    })
  }
})

export default router
