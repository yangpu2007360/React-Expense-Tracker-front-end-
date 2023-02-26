import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Balance from './components/Balance';
import History from './components/History';
import AddTransaction from './components/AddTransaction';
function App() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/")
        .then(response => setTransactions(response.data))
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
    try { axios.post("http://localhost:3000/", newRecord).then(response => setTransactions(response.data)) }
    catch (error) {
      console.log(error)
    }
  }
  const deleteFromHistory = (id) => {
    try { axios.delete(`http://localhost:3000/${id}`).then(response => setTransactions(response.data)) }
    catch (error) {
      console.log(error)
    }
  }
  const amounts = transactions.map(a => a.amount);
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
