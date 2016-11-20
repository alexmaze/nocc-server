import mongoose from 'mongoose'

export let EventScheme = new mongoose.Schema({
  title: String,
  location: String,
  content: String,

  poster: Array,
  images: Array,

  title_en: String,
  location_en: String,
  content_en: String,

  type: Number, // 0 forum 1 lecture 2 workshop  10 lab
  time: String,
  created: Date
})
// {
//     description: String,
//     description_en: String,
//     url: String
//   }
export let Event = mongoose.model('Event', EventScheme)
