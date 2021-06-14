import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deletedExpense, editRequest } from '../actions';
import './TableExpenses.css';

class TableExpenses extends Component {
  constructor(props) {
    super(props);

    this.renderTableBody = this.renderTableBody.bind(this);
  }

  handleDelete(filter) {
    const { expenses, deleteExpense } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== filter.id);
    deleteExpense(filteredExpenses);
  }

  handleEdit(expense) {
    const { expenseToEdit } = this.props;
    expenseToEdit(expense);
  }

  renderTableBody() {
    const { expenses, edit } = this.props;
    return (
      <tbody>
        {expenses.map((expense) => (
          <tr key={ Math.random() } className="table-body">
            <td>{expense.description || 'Sem descrição'}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{Number(expense.value).toFixed(2) || '0.00'}</td>
            <td>
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td>
              {Number(expense.value
                * expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td>Real</td>
            <td className="icons">
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.handleEdit(expense) }
                disabled={ edit }
              >
                <FontAwesomeIcon
                  icon={ faEdit }
                  className="icon icon-edit"
                />
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleDelete(expense) }
                disabled={ edit }
              >
                <FontAwesomeIcon
                  icon={ faTrashAlt }
                  className="icon icon-delete"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <table className="TableExpenses">
        <thead className="table-head">
          <tr>
            <th className="description">Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {this.renderTableBody()}
      </table>
    );
  }
}

const mapStatetoProps = (state) => ({
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses) => dispatch(deletedExpense(expenses)),
  expenseToEdit: (expense) => dispatch(editRequest(expense)),
});

TableExpenses.propTypes = {
  espenses: PropTypes.arrayOf(PropTypes.object),
}.isRequered;

export default connect(mapStatetoProps, mapDispatchToProps)(TableExpenses);
