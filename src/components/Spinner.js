import React from 'react'
import { useLoading } from '../TransactionsContext.js';
import spinner from './assets/spinner.gif'


function Spinner() {
    const loading = useLoading()
    console.log("loading is", loading)
    if (loading) {
        return (
            <img className='loading' src={spinner} alt="loading" width="100" height="100" />
        )
    }
}
export default Spinner