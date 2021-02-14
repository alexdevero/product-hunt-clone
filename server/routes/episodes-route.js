const express = require('express')

const Episode = require('./../models/episode-model')

const router = express.Router()

router.get('/', async (req, res) => {
  const episodes = await Episode.find((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message
      })
    } else {
      res.json(data)
    }
  })
})

router.get('/:episode_id', async (req, res) => {
  const episode = await Episode.find({ _id: req.params.episode_id }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message
      })
    } else {
      res.json(data)
    }
  })
})

router.post('/create', async (req, res) => {
  if (req.body.title !== null && req.body.url !== null && req.body.description !== null) {
    const episode = new Episode({
      title: req.body.title,
      url: req.body.url,
      description: req.body.description
    })

    const newEpisode = await episode.save().then(() => {
      res.json({ message: 'Episode created.' })
    }).catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  } else {
    res.status(500).json({ message: 'Please fill in all information.' })
  }
})

router.patch('/update', async (req, res) => {
  if (req.body._id !== null) {
    const updateEpisode = { ...req.body }

    const episode = await Episode.findOneAndUpdate({ _id: req.body._id }, updateEpisode, { useFindAndModify: false }, (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json({ message: 'Episode updated.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify episode id.' })
  }
})

router.delete('/delete', async (req, res) => {
  if (req.body._id !== null) {
    const episode = await Episode.deleteOne({ _id: req.body._id }, (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json({ message: 'Episode deleted.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify episode id.' })
  }
})

router.delete('/defcon', async (req, res) => {
  if (req.body.secret_password !== null) {
    const episode = Episode.deleteMany((err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.status(200).json({ message: 'All episodes deleted.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify secret password to delete everything.' })
  }
})

module.exports = router
