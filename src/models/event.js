import mongoose from 'mongoose'

export let EventScheme = new mongoose.Schema({
  title: String,
  location: String,
  content: String,

  poster: {
    description: String,
    description_en: String,
    url: String
  },
  images: Array,

  title_en: String,
  location_en: String,
  content_en: String,

  time: String,
  created: Date
})

export let Event = mongoose.model('Event', EventScheme)
