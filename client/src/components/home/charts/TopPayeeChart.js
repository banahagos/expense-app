import React from 'react';
import { Bar } from 'react-chartjs-2';

const TopPayeeChart = props => {
  const expenses = new Map();
  for (let expense of props.listOfExpenses) {
    const current = expenses.get(expense.payee);
    if (typeof current !== 'undefined') {
      expenses.set(expense.payee, current + expense.amount);
    } else {
      expenses.set(expense.payee, expense.amount);
    }
  }
  const values = [...expenses.entries()].sort((a, b) => {
    return b[1] - a[1];
  });
  
  return (
    <div className="chart">
      <Bar
        data={{
          labels: values.map(entry => entry[0]).slice(0,5),
          datasets: [
            {
              label: 'Top Payees',
              data: values.map(entry => entry[1]).slice(0,5),
              backgroundColor: [
                'rgba(255,51,102,0.1)',
                'rgba(255,51,102,0.1)',
                'rgba(255,51,102,0.1)',
                'rgba(255,51,102,0.1)',
                'rgba(255,51,102,0.1)',
              ],
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

export default TopPayeeChart;