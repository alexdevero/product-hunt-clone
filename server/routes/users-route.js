const express = require('express')
const User = require('./../models/user-model')

const router = express.Router()

router.get('/', async (req, res) => {
  const user = await User.find((err, data) => {
    if (err) {
      res.status(500).json({ message: err.message })
    } else {
      res.status(200).json(data)
    }
  })
})

router.get('/:user_id', async (req, res) => {
  const user = await User.find({ _id: req.params.user_id }, (err, data) => {
    if (err) {
      res.status(500).json({ message: err.message })
    } else {
      res.status(200).json(data)
    }
  })
})

