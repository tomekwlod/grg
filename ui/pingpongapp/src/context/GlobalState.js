import React, { createContext, useState, useReducer } from "react";

// Create context
export const GlobalContext = createContext({});

export let state, user, setUser, isAuthenticated, setIsAuthenticated;

// Provider component - in order for the other components to have access to
// this global store we have to wrap everything using this provider
// - children are the components within this provider
export const GlobalProvider = ({ children }) => {
  [user, setUser] = useState({});
  [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <GlobalContext.Provider
      value={
        {
          // transactions: state.transactions,
          // transactionForm: state.transactionForm,
          // error: state.error,
          // loading: state.loading,
          // getTransactions,
          // deleteTransaction,
          // addTransaction,
          // selectTransaction,
          // state
          // initialTransactionForm,
          // transactionForm,
          // setTransaction,
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};
