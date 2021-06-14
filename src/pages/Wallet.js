import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    const { editing } = this.props;
    return (
      <>
        <Header />
        <AddExpense key={ editing } />
        <TableExpenses />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editing: state.wallet.edit,
});

Wallet.propTypes = {
  editing: PropTypes.boll,
}.isRequered;

export default connect(mapStateToProps)(Wallet);
