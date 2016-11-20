import mongoose from 'mongoose'

export let FacultyScheme = new mongoose.Schema({
  title: String,
  position: String,
  description: String,

  photo: String,

  title_en: String,
  position_en: String,
  description_en: String,

  email: String
})
export let Faculty = mongoose.model('Faculty', FacultyScheme)
