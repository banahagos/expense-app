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
    <div className="chart card mb-6 col-xs-12  col-sm-12  col-md-6">
      <div className="card-header">
        <h6>Top Categories</h6>
      </div>
      <div className="card-body">
      <article className="charts-container">
        <Radar
          data={{
            labels: values.map(entry => entry[0]),
            datasets: [
              {
                label: 'Expenses per category',
                data: values.map(entry => entry[1]),
                backgroundColor: [
                  '#FF3366',
                ],
              }
            ]
          }}
          options={{
            maintainAspectRatio: false,
            scale: {
              angleLines: { 
                color: 'rgba(242, 242, 242,0.1)',
              },
              ticks: {
                display: false
              },
              gridLines: {
                color: 'rgba(242, 242, 242,0.1)',
                // color: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo']
              }
            },
            legend: {
              labels: {
                fontColor: '#F2F2F2',
                fontSize: 11
              }
            }

          }}

        />
        </article>
      </div>
    </div>
  )
}

export default TopCategoryChart;