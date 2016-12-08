import express from 'express'
import { Faculty } from '../models/faculty'
import { pageQuery } from '../utils/db-utils'

let router = express.Router()

router.post('/', (req, res) => {
  let faculty = new Faculty(req.body)
  faculty.created = new Date()
  faculty.save(err => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.json(faculty)
  })
})

router.post('/:id/patch', (req, res) => {
  Faculty.findById(req.params.id, (err, faculty) => {
    if (err) {
      return res.status(404).json(err)
    }
    Object.assign(faculty, req.body)
    faculty.save(err => {
      if (err) {
        return res.status(500).json(err)
      }
      return res.json(faculty)
    })
  })
})

router.get('/:id', (req, res) => {
  Faculty.findById(req.params.id, (err, faculty) => {
    if (err) {
      return res.status(404).json(err)
    }
    return res.json(faculty)
  })
})

router.post('/:id/delete', (req, res) => {
  Faculty.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(404).json(err)
    }
    return res.status(200).end()
  })
})

router.get('/', (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1
  const perpage = parseInt(req.query.perpage, 10)

  if (!perpage) {
    Faculty.find().exec((err, facultys) => {
      if (err) {
        return res.status(500).json(err)
      }
      return res.json(facultys)
    })
  } else {
    pageQuery(page, perpage, Faculty, undefined, {}, { created: 'desc' }, (err, $page) => {
      return res.json($page)
    })
  }
})

export default router
