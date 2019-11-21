import React from 'react'
import { Line } from 'react-chartjs-2';
import { compareAsc, format, parseISO, subDays, startOfDay } from 'date-fns';

const ExpensesByPeriodChart = props => {
  const numDays = 8;
  // new Map((new Array(numDays)).map((_, index) => [subDays(Date.now(), numDays - index - 1), 0]))
  const xLabels = [...Array(numDays)].map((_, index) => [startOfDay(subDays(Date.now(), numDays - index - 1)), 0])
  console.log(xLabels)

  const expenses = new Map();
  for (let expense of props.listOfExpenses) {
    const current = expenses.get(expense.dateOfExpense);
    if (typeof current !== 'undefined') {
      expenses.set(expense.dateOfExpense, current + expense.amount);
    } else {
      expenses.set(expense.dateOfExpense, expense.amount);
    }
  }
  const values = [...expenses.entries()].sort((a, b) => {
    return compareAsc(parseISO(a[0]), parseISO(b[0]));
  });

  return (
    <div className="chart">
      <Line
        data={{
          labels: values.map(entry => format(parseISO(entry[0]), 'MMM do')),
          datasets: [
            {
              label: 'Expenses',
              data: values.map(entry => entry[1]),
              backgroundColor: [
                'rgba(255,51,102,0.1)',
              ],
              lineTension: 0.4,
              borderColor: [
                'rgba(255,51,102,1)',
              ],
              borderWidth: 1
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                callback: function (value, index, values) {
                  return '€' + value;
                }
              }
            }],
          }
        }}

      />
    </div>
  )

}

export default ExpensesByPeriodChart;
