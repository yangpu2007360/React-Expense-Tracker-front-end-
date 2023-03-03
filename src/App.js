import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Balance from './components/Balance';
import History from './components/History';
import AddTransaction from './components/AddTransaction';
import { useReducer } from 'react';

function tasksReducer(state, action) {
  switch (action.type) {
    case 'added': {
      return [...state, {
        id: action.id,
        text: action.text,
        amount: action.amount
      }];
    }
    case 'fetch': {
      return action.payload;
    }
    case 'delete': {
      return state.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function App() {
  const [transactions, dispatch] = useReducer(
    tasksReducer,
    []
  );
  // const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/")
        .then(response => dispatch({
          type: 'fetch',
          payload: response.data
        }))
    }
    catch (error) {
      console.log(error)
    }
  }, []);
  const handleSubmit = (data) => {
    const newRecord = {
      id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
      text: data.text,
      amount: +data.amount
    }
    const newTransactions = transactions.concat(newRecord)
    try {
      axios.post("http://localhost:3000/", newRecord).then(
        // setTransactions(newTransactions)
        dispatch({
          type: 'added',
          id: newRecord.id,
          text: newRecord.text,
          amount: newRecord.amount,
        })
      )
    }
    catch (error) {
      console.log(error)
    }
  }
  const deleteFromHistory = (id) => {
    // const updatedTransactions = transactions.filter(record => record.id !== id)
    try {
      axios.delete(`http://localhost:3000/${id}`).then(dispatch({
        type: 'delete',
        id: id
      }))
    }
    catch (error) {
      console.log(error)
    }
  }
  const amounts = transactions.map(a => parseFloat(a.amount));
  const incomeList = amounts.filter(function (a) { return a >= 0 })
  const income = incomeList.reduce((partialSum, a) => partialSum + a, 0)
  const expenseList = amounts.filter(function (a) { return a < 0 })
  const expense = Math.abs(expenseList.reduce((partialSum, a) => partialSum + a, 0))
  return (
    <div className='expense-tracker-container' >
      <div className='title'>Expense Tracker by Pu Yang</div>
      <Balance income={income} expense={expense} />
      <History transactions={transactions} deleteFromHistory={deleteFromHistory} />
      <AddTransaction handleSubmit={handleSubmit} />
    </div>
  );
}
export default App;
