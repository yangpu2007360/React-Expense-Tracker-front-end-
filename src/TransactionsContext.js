import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const TransactionsContext = createContext(null);
const TransactionsDispatchContext = createContext(null);
export function TransactionsProvider({ children }) {
    const [transactions, dispatch] = useReducer(
        transactionsReducer,
        []
    );
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
    return (
        <TransactionsContext.Provider value={transactions}>
            <TransactionsDispatchContext.Provider value={dispatch}>
                {children}
            </TransactionsDispatchContext.Provider>
        </TransactionsContext.Provider>
    );
}
function transactionsReducer(state, action) {
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

export function useTransactions() {
    return useContext(TransactionsContext);
}

export function useTransactionsDispatch() {
    return useContext(TransactionsDispatchContext);
}

