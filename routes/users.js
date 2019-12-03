const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Expense = require('../models/expense');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// GET profile page
router.get('/profile', async (req, res, next) => {
  let user = await User.findOne({ _id: req.user._id })
  res.json(user)
})

// delete account
router.delete('/profile/:id/delete', async (req, res, next) => {
  await Expense.deleteMany({ owner: req.user._id })
  await User.deleteOne({ _id: req.user._id })
  res.json({ message: `Account of ${req.user.username} has been removed successfully.` })
})


module.exports = router;
