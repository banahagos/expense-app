import React from 'react';
import { Radar } from 'react-chartjs-2';

const TopCategoryChart = props => {

  const expenses = new Map();
  for (let expense of props.listOfExpenses) {
    const current = expenses.get(expense.category);
    if (typeof current !== 'undefined') {
      expenses.set(expense.category, current + expense.amount);
    } else {
      expenses.set(expense.category, expense.amount);
    }
  }
  const values = [...expenses.entries()].sort((a, b) => {
    return b[1] - a[1];
  });

  return (
    <div className="chart">
      <Radar
        data={{
          labels: values.map(entry => entry[0]),
          datasets: [
            {
              label: 'Expenses per category',
              data: values.map(entry => entry[1]),
              backgroundColor: [
                'rgba(255,51,102,0.1)',
              ],
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          
        }}

      />
    </div>
  )
}

export default TopCategoryChart;