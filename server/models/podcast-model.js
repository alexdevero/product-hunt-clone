const mongoose = require('mongoose')

const PodcastSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false
  }
})

const Podcast = mongoose.model('Podcast', PodcastSchema)

module.exports = Podcast
