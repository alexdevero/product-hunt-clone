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

router.post('/create', async (req, res) => {
  if (req.body.name !== null && req.body.username !== null && req.body.email !== null && req.body.password !== null) {
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .save()
    .then(() => res.json({ message: 'User registration successful.' }))
    .catch((err) => res.status(500).json({ message: err.message }))
  } else {
    res.status(500).json({ message: 'Please fill in all information.' })
  }
})

router.patch('/update', async (req, res) => {
  if (req.body._id !== null) {
    const updateUser = { ...req.body }

    const user = await User.findOneAndUpdate({ id: req.body._id }, updateUser, { useFindAndModify: false }, (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json({ message: 'User updated.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify user id.' })
  }
})

router.delete('delete', async (req, res) => {
  if (req.body._id !== null) {
    const user = User.deleteOne({ _id: req.body._id }, (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json({ message: 'User deleted.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please specify user id.' })
  }
})

router.delete('defcon', async (req, res) => {
  if (req.body.secret_password !== null) {
    const user = User.remove((err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json({ message: 'All users deleted.' })
      }
    })
  } else {
    res.status(500).json({ message: 'Please secret password to delete everything.' })
  }
})

module.exports = router
