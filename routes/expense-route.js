const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const mongoose = require('mongoose');


// Get route ==> get all expenses
router.get('/expenses', async (req, res, next) => {
  try {
    const expenseList = await Expense.find({ owner: req.user })
      .sort({ created: -1 })
    res.json(expenseList)
  }
  catch (err) {
    res.json(err)
  }
})

// Post route ==> create new expense
router.post('/new-expense', (req, res, next) => {
  const { payee, amount, category, dateOfExpense, monthlyRecurring } = req.body

  if (!payee || !amount || !category || !dateOfExpense) {
    res.status(400).json({ message: 'Please fill out all fields' });
    return;
  }
  Expense.create({
    payee,
    amount,
    category,
    dateOfExpense,
    monthlyRecurring,
    owner: req.user._id
  })
    .then(response => res.json(response))
    .catch(err => res.json(err))

})

// Get route ==> get details of specific expense
router.get('/expenses/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const expense = await Expense.findOne({ owner: req.user, _id: req.params.id })
    res.json(expense)
  }
  catch (err) {
    res.json(err)
  }
})

// PUT route => to update a specific expense
router.put('/expenses/:id', (req, res, next) => {
  const { payee, category, amount, dateOfExpense, monthlyRecurring } = req.body

  if (!payee || !amount || !category || !dateOfExpense) {
    res.status(400).json({ message: 'Please fill out all fields' });
    return;
  }

  Expense.findById(req.params.id).then((expense) => {
    if (!expense.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });

    } else {
      Expense.findByIdAndUpdate(req.params.id, { payee, category, amount, dateOfExpense, monthlyRecurring })
        .then(() => {
          res.json({ message: `Project with ${req.params.id} is updated successfully.` })

        })
        .catch(err => res.json(err))
    }
  })
});

// PUT route => to update a specific expense
router.delete('/expenses/:id', (req, res, next) => {
  const { payee, category, amount, dateOfExpense, monthlyRecurring } = req.body

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Expense.findById(req.params.id).then((expense) => {
    if (!expense.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });

    } else {
      Expense.findByIdAndRemove(req.params.id, { payee, category, amount, dateOfExpense, monthlyRecurring })
        .then(() => {
          res.json({ message: `Expense with ${req.params.id} has been removed successfully.` })

        })
        .catch(err => res.json(err))
    }
  })
});



module.exports = router;

