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

router.post('/create', async (req, res) => {
  try {
    const episode = new Episode({
      title: req.body.title,
      url: req.body.url,
      description: req.body.description
    })

    const newEpisode = await episode.save()

    res.json({ message: 'Episode created.' })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.patch('/update', async (req, res) => {
  try {
    const updateEpisode = { ...req.body }

    const episode = Episode.findOneAndUpdate({ username: req.body.episode_id }, updateEpisode, { useFindAndModify: false }, (err) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.json({ message: 'User updated.' })
      }
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.delete('/delete/:episode_id', async (req, res) => {
  try {
    const episode = await Episode.remove({ id: req.params.episode_id })

    res.json({ message: 'Episode deleted.' })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})
