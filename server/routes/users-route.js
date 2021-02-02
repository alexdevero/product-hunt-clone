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
