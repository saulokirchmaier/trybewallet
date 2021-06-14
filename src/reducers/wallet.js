import { REQ_CURRENCIES,
  GET_CURRENCIES,
  ADD_EXPENSE,
  DELETED_EXPENSE,
  EDITING_EXPENSE,
  EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  edit: false,
  toEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQ_CURRENCIES:
    return {
      ...state,
      isLoading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      isLoading: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETED_EXPENSE:
    return {
      ...state,
      expenses: [...action.expenses],
    };
  case EDITING_EXPENSE:
    return {
      ...state,
      edit: true,
      toEdit: action.expense,
    };
  case EDITED_EXPENSE:
    return {
      ...state,
      edit: false,
      toEdit: {},
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
