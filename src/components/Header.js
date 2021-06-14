import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '../images/logo-wallet.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let totalExpenses = 0;
    if (expenses.length > 0) {
      totalExpenses = expenses
        .reduce((acc, curr) => (acc
          + (Number(curr.value)
          * Number(curr.exchangeRates[curr.currency].ask))), 0).toFixed(2);
    }
    return (
      <div className="Header">
        <div className="logo">
          <img src={ logo } alt="logo trybewallet" />
          <h1>TrybeWallet</h1>
        </div>
        <h3 data-testid="email-field" className="email">{ email }</h3>
        <div className="currency">
          <h3 className="total">
            Despesas: R$
            <p data-testid="total-field">
              { totalExpenses }
            </p>
          </h3>
          <h5 data-testid="header-currency-field">BRL</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequered;

export default connect(mapStateToProps)(Header);
