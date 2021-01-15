const express = require('express')

const Episode = require('./../models/episode-model')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const episodes = await Episode.find()

    res.json(episodes)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

