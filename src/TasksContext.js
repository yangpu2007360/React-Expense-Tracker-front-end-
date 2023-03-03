import { createContext, useContext, useReducer } from 'react';

const TransactionsContext = createContext(null);

const TransactionsDispatchContext = createContext(null);

export function TransactionsProvider({ children }) {
    const [transactions, dispatch] = useReducer(
        transactionsReducer,
        []
    );

    return (
        <TransactionsContext.Provider value={transactions}>
            <TransactionsDispatchContext.Provider value={dispatch}>
                {children}
            </TransactionsDispatchContext.Provider>
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    return useContext(TransactionsContext);
}

export function useTransactionsDispatch() {
    return useContext(TransactionsDispatchContext);
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

