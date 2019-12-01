import React, { Component } from 'react';
import '../App.css';
import * as d3 from 'd3';
import _ from 'lodash';
import Expenses from './Expenses';
import Day from './Day';
// import Categories from './Categories';
import AddExpenseForm from '../components/expenses/AddExpenseForm';
import ResponsiveWrapper from '../components/ResponsiveWrapper/ResponsiveWrapper';
import EditExpenseForm from '../components/expenses/EditExpenseForm';
import axios from 'axios';



// const width = 750; // 750 width of the app
const height = 1800; // height of the app
const colors = {
  white: '#fff8fa', //color of the expense circles
  gray: '#e1ecea', //categories and empty day card
  black: '#516561', // headline, category text input field
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditFormVisible: false,
      isAddNewFormVisible: true,
      prefillEditForm: {},
      errMsg: null
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
    this.setState({prefillEditForm: expenseObj})
  }

  updateExpense = expense => {
    axios.put(`/api/expenses/${this.state.prefillEditForm._id}`, expense)
      .then(() => {
        this.setState({
          errMsg: null
        })
        this.props.getExpenses('')
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
    // todo: error handling
    var selectedWeek = d3.timeWeek.offset(this.props.selectedWeek, -1);
    this.props.getSelectedWeek(selectedWeek)
  }

  nextWeek = () => {
    // todo: error handling
    var selectedWeek = d3.timeWeek.offset(this.props.selectedWeek, 1);
    this.props.getSelectedWeek(selectedWeek)
  }


  editDate = (expense, day) => {
    expense.date = day.date;
    this.forceUpdate();
  }


  render() {
    let selectedWeek = d3.timeFormat('%B %d, %Y')(this.props.selectedWeek);
    const style = {
      width: this.props.parentWidth,
      margin: 'auto',
    }
    const svgStyle = {
      overflow: 'visible',
      position: 'absolute',
      top: 0,
      width: this.props.parentWidth,
      height,
      zIndex: -1,

    }

    const props = {
      width: this.props.parentWidth,
      colors,
      // linkToCategory: this.linkToCategory,
      editDate: this.editDate,
      // deleteCategory: this.deleteCategory,
      selectedWeek: this.props.selectedWeek,
      expenses: this.props.expenses,
      handleEditFormVisibility: this.handleEditFormVisibility,
      handleAddFormVisibility: this.handleAddFormVisibility,
      getEditObject: this.getEditObject,
    };

    return (
      <div className='App' style={style} >
        <h3 style={{ textAlign: 'center', color: colors.black }}>
          <span style={{ cursor: 'pointer' }} onClick={this.prevWeek}>← </span>
          Week of {selectedWeek}
          <span style={{ cursor: 'pointer' }} onClick={this.nextWeek}> →</span>
        </h3>
        {this.state.isAddNewFormVisible && <AddExpenseForm getExpenses={this.props.getExpenses} />}
        {this.state.isEditFormVisible && <EditExpenseForm 
        prefill={this.state.prefillEditForm}
        updateExpense={this.updateExpense}
        deleteExpense={this.deleteExpense}
        errMsg={this.state.errMsg}
        />}
        {/* <input id='addCategory' style={inputStyle} type='text' placeholder='Add Category'
          onFocus={this.startCategory} onBlur={this.clearCategory} onKeyDown={this.addCategory}></input> */}

        <svg style={svgStyle} >
          <Day {...props} {...this.state} />
          {/* <Categories {...props} {...this.state} /> */}
          <Expenses {...props} {...this.state} />
        </svg>
      </div>
    );
  }
}

export default ResponsiveWrapper(App);