import './App.css';
import React, { useState } from 'react';
import Balance from './components/Balance';
import History from './components/History';
import AddTransaction from './components/AddTransaction';
function App() {
  const [transactions, setTransactions] = useState([{ id: 1, text: 'book', amount: -40 }, { id: 2, text: 'salary', amount: 1000 }, { id: 3, text: 'food', amount: -240 }]);
  const handleSubmit = (data) => {
    const newRecord = {
      id: transactions.length + 1,
      text: data.text,
      amount: +data.amount
    }
    setTransactions(transactions.concat(newRecord))
  }
  const deleteFromHistory = (id) => {
    setTransactions(transactions.filter(record => record.id !== id))
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
