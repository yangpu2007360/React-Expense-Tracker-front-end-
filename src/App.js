import './App.css';
import React from 'react';
import Balance from './components/Balance';
import History from './components/History';
import AddTransaction from './components/AddTransaction';
import Spinner from './components/Spinner';
import { TransactionsProvider } from './TransactionsContext.js';


function App() {
  return (
    <div className='expense-tracker-container' >
      <TransactionsProvider>
        <div className='title'>Expense Tracker by Pu Yang</div>
        <Balance />
        <Spinner />
        <History />
        <AddTransaction />
      </TransactionsProvider>

    </div>
  );
}
export default App;
