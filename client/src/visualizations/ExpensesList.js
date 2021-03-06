import React, { Component } from 'react';
import '../App.css';
import * as d3 from 'd3';
import Expenses from './Expenses';
import Day from './Day';
import AddExpenseForm from '../components/expenses/AddExpenseForm';
import ResponsiveWrapper from '../components/ResponsiveWrapper/ResponsiveWrapper';
import EditExpenseForm from '../components/expenses/EditExpenseForm';
import axios from 'axios';


const height = 800;
const colors = {
  white: '#fff8fa', // color of the expense circles
  gray: '#e1ecea', // categories and empty day card
  black: '#516561', // headline, category text input field
};

class ExpensesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditFormVisible: false,
      isAddNewFormVisible: true,
      prefillEditForm: {},
      errMsg: null,
    };
  }

  componentDidMount() {
    this.props.getExpenses('')
  }

  handleEditFormVisibility = () => {
    this.setState({
      isAddNewFormVisible: false,
      isEditFormVisible: true,
    })
  }

  getEditObject = expenseObj => {
    this.setState({ prefillEditForm: expenseObj })
  }

  updateExpense = expense => {
    axios.put(`/api/expenses/${this.state.prefillEditForm._id}`, expense)
      .then(() => {
        this.setState({
          errMsg: null
        })
        this.props.getExpenses('')
        this.props.getTodayExpenses()
        this.handleAddFormVisibility()
      })
      .catch(error => {
        console.log("something went wrong with edit", error)
        this.setState({ errMsg: error.response.data.message })
      })
  }

  deleteExpense = () => {
    axios.delete(`/api/expenses/${this.state.prefillEditForm._id}`)
      .then(() => {
        this.setState({
          errMsg: null
        })
        this.props.getExpenses('')
        this.handleAddFormVisibility()
      })
      .catch(error => {
        console.log("something went wrong with delete", error)
        this.setState({ errMsg: error.response.data.message })
      })
  }

  handleAddFormVisibility = () => {
    this.setState({
      isAddNewFormVisible: true,
      isEditFormVisible: false
    })
  }

  prevWeek = () => {
    let selectedWeek = d3.timeWeek.offset(this.props.selectedWeek, -1);
    this.props.getSelectedWeek(selectedWeek)
  }

  nextWeek = () => {
    let selectedWeek = d3.timeWeek.offset(this.props.selectedWeek, 1);
    this.props.getSelectedWeek(selectedWeek)
  }

  render() {
    let selectedWeek = d3.timeFormat('%B %d, %Y')(this.props.selectedWeek);
    return (
      <div className='ExpensesList' width={this.props.parentWidth} >
        <h3>
          <span className='ExpensesList-arrows' onClick={this.prevWeek}>← </span>
          Week of {selectedWeek}
          <span className='ExpensesList-arrows' onClick={this.nextWeek}> →</span>
        </h3>
        {this.state.isAddNewFormVisible &&
          <AddExpenseForm
            getExpenses={this.props.getExpenses}
            handleAddFormVisibility={this.handleAddFormVisibility}
            getTodayExpenses={this.props.getTodayExpenses} />}

        {this.state.isEditFormVisible &&
          <EditExpenseForm
            prefill={this.state.prefillEditForm}
            updateExpense={this.updateExpense}
            deleteExpense={this.deleteExpense}
            errMsg={this.state.errMsg}
          />}


        <svg className='svg' width={this.props.parentWidth} height={height}>
          <Day
            width={this.props.parentWidth}
            colors={colors}
            editDate={this.editDate}
            selectedWeek={this.props.selectedWeek}
            expenses={this.props.expenses}
          />
          <Expenses
            width={this.props.parentWidth}
            colors={colors}
            editDate={this.editDate}
            selectedWeek={this.props.selectedWeek}
            expenses={this.props.expenses}
            handleEditFormVisibility={this.handleEditFormVisibility}
            getEditObject={this.getEditObject}
          />
        </svg>
      </div>
    );
  }
}

export default ResponsiveWrapper(ExpensesList);
