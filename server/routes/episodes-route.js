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

router.get('/:episode_id', async (req, res) => {
  try {
    const episode = await Episode.find({ id: req.params.episode_id })

    if (episode !== null || (Array.isArray(episode) && episode.length !== 0)) {
      res.json(episode)
    } else {
      res.status(404).json({ message: 'Couldn\'t find specified episode.' })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

