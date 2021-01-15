const mongoose = require('mongoose')

const EpisodeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
})

const Episode = mongoose.model('Episode', EpisodeSchema)

module.exports = Episode
