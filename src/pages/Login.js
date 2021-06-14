import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction } from '../actions/index';
import './Login.css';
import imgLogin from '../images/imgLogin.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validInput());
  }

  validInput() {
    const { email, password } = this.state;
    const validEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const validPassword = new RegExp(/[\w\D]{6}/g);
    if (validEmail.test(email) && validPassword.test(password)) {
      this.setState({ disable: false });
    } else this.setState({ disable: true });
  }

  handleClick() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
  }

  render() {
    const { disable, email, password } = this.state;
    return (
      <div className="Login">
        <img src={ imgLogin } alt="Wallet" />
        <h1>TrybeWallet</h1>
        <h2>Login</h2>
        <form className="form-login">
          <label htmlFor="email-input">
            Email:
            <input
              type="text"
              data-testid="email-input"
              id="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              id="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ disable }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.objectOf(),
}.isRequered;

export default connect(null, mapDispatchToProps)(Login);
