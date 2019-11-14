const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Expense = require('../models/expense');


// Post route ==> create new expense
router.post('/new-expense', (req, res, next) => {
  const {payee, amount, category, dateOfExpense, monthlyRecurring} = req.body
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

// Get route ==> get all expenses
router.get('/expenses', async (req, res, next) => {
  try {
    let expenseList = await Expense.find({owner:req.user})
    res.json(expenseList)
  }
  catch(err){
    res.json(err)
  }
})

module.exports = router;

