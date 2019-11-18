const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const mongoose = require('mongoose');
const { startOfDay, subWeeks, subMonths } = require('date-fns') ;


// // Get route ==> get all expenses
// router.get('/expenses', async (req, res, next) => {

//   try {
//     const expenseList = await Expense.find({ owner: req.user })
//       .sort({ created: -1 })
//     res.json(expenseList)
//   }
//   catch (err) {
//     res.json(err)
//   }
// })

// GET route => filter expenses by dates 
router.get('/expenses/', async (req, res, next) => {
  const lastWeek = startOfDay(subWeeks(Date.now(), 1));
  const lastMonth = startOfDay(subMonths(Date.now(), 1));

  let dateRange;
  switch(req.query.filter){
    case 'lastweek': dateRange = lastWeek;
      break;
    case 'lastmonth': dateRange = lastMonth
  }

  try {
    if(req.query.filter){
      const filterExpenseList = await Expense.find({owner: req.user, dateOfExpense: {$gt: dateRange }})
      .sort({ created: -1 })
      res.json(filterExpenseList)
    } else {
      const expenseList = await Expense.find({owner: req.user })
      .sort({ created: -1 })
      res.json(expenseList)
    }
    }

  catch(err){
    res.json(err)
  }
})

// Post route ==> create new expense
router.post('/new-expense', (req, res, next) => {
  const { amount, category, dateOfExpense, monthlyRecurring } = req.body

  const payee = req.body.payee.toUpperCase()

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

// // Get route ==> get details of specific expense
// router.get('/expenses/:id', async (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   try {
//     const expense = await Expense.findOne({ owner: req.user, _id: req.params.id })
//     res.json(expense)
//   }
//   catch (err) {
//     res.json(err)
//   }
// })

// PUT route => to update a specific expense
router.put('/expenses/:id', (req, res, next) => {
  const { category, amount, dateOfExpense, monthlyRecurring } = req.body
  const payee = req.body.payee.toUpperCase()

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

