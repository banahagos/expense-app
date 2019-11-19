import React from 'react'
import { Line } from 'react-chartjs-2';
import { compareAsc, format, parseISO } from 'date-fns';

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: ["2019-11-14T00:00:00.000Z", "2019-11-13T00:00:00.000Z"], //this.props.listOfExpenses.map(e => e.dateOfExpense), //["Apple", "Oranges", "Mango"],
        datasets: [
          {
            label: 'Expenses',
            data: this.props.listOfExpenses.map(e => e.amount) //[20, 50, 30],
          }
        ]
      }
    }
  }

  render() {
    // const numDays = 7;
    // new Map((new Array(numDays)).map((_, index) => [subDays(Date.now(), numDays - index - 1), 0]))
    const expenses = new Map();
    for (let expense of this.props.listOfExpenses) {
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
    console.log(values);
    return (
      <div className="chart">
        <Line
        data={{
          labels: values.map(entry => format(parseISO(entry[0]), 'MMM do')), //this.props.listOfExpenses.map(e => e.dateOfExpense), //["Apple", "Oranges", "Mango"],
          datasets: [
            {
              label: 'Expenses',
              data: values.map(entry => entry[1]) //[20, 50, 30],
            }
          ]
        }}
        />
      </div>
    )
  }
}

export default Chart;
