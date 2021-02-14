const express = require('express')

const Podcast = require('./../models/podcast-model')

const router = express.Router()

router.get('/', async (req, res) => {
  const podcasts = await Podcast.find((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message
      })
    } else {
      res.status(200).json(data)
    }
  })
})

router.get('/:podcast_id', async (req, res) => {
  const podcast = await Podcast.find({_id: req.params.podcast_id}, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message
      })
    } else {
      res.status(200).json(data)
    }
  })
})

router.post('/create', async (req, res) => {
  if (req.body.title !== null && req.body.url !== null) {
    const podcast = new Podcast({
      title: req.body.title,
      url: req.body.url,
      thumbnail: req.body.thumbnail ? req.body.thumbnail : ''
    })

    const newPodcast = await podcast.save().then(() => {
      res.json({ message: 'Podcast created.' })
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
    const updatePodcast = { ...req.body }

    const podcast = await Podcast.findOneAndUpdate({ _id: req.body._id }, updatePodcast, { useFindAndModify: false }, (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.status(200).json({ message: 'Podcast updated.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify podcast id.' })
  }
})

router.delete('/delete', async (req, res) => {
  if (req.body._id !== null) {
    const podcast = await Podcast.deleteOne({ _id: req.body._id }, (err) => {
      if (err) {
        res.status(200).json({
          message: err.message
        })
      } else {
        res.json({ message: 'Podcast deleted.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify podcast id.' })
  }
})

router.delete('/defcon', async (req, res) => {
  if (req.body.secret_password !== null) {
    const podcast = await Podcast.deleteMany((err) => {
      if (err) {
        res.status(200).json({
          message: err.message
        })
      } else {
        res.json({ message: 'All podcasts deleted.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify secret password to delete everything.' })
  }
})

module.exports = router
