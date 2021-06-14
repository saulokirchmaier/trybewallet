export const LOGIN = 'LOGIN';
export const REQ_CURRENCIES = 'REQ_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETED_EXPENSE = 'DELETE_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

const requestCurrencies = () => ({
  type: REQ_CURRENCIES,
});

const getCurrencis = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    dispatch(requestCurrencies());
    const currenciesFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currenciesJSON = await currenciesFetch.json();
    const currencies = Object.keys(currenciesJSON);
    currencies.splice(1, 1);
    return dispatch(getCurrencis(currencies));
  }
);

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const addNewExpense = (expense) => (
  async (dispatch) => {
    const exchangeRatesFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await exchangeRatesFetch.json();
    const newExpenseToAdd = {
      ...expense,
      exchangeRates,
    };
    return dispatch(addExpense(newExpenseToAdd));
  }
);

export const deletedExpense = (expenses) => ({
  type: DELETED_EXPENSE,
  expenses,
});

export const editRequest = (expense) => ({
  type: EDITING_EXPENSE,
  expense,
});

export const editExpense = (expenses) => ({
  type: EDITED_EXPENSE,
  expenses,
});
