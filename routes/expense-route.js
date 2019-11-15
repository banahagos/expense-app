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

// PUT route => to update a specific expense
router.put('/expenses/:id', (req, res, next) => {
  const { payee, category, amount, dateOfExpense, monthlyRecurring } = req.body

  Expense.findById(req.params.id).then((expense) => {
    if (!expense.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });

    } else {
      Expense.findByIdAndUpdate(req.params.id, { payee, category, amount, dateOfExpense, monthlyRecurring })
        .then(() => {
          res.json({ message: `Project with ${req.params.id} is updated successfully.` })

        })
    }
  })
});



module.exports = router;

