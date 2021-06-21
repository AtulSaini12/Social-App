import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearAuthState, login } from '../actions/auth';

class Login extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.emailInputRef = React.createRef();
  //     this.passwordInputRef = React.createRef();
  //   }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleSubmitControlledComponent = (e) => {
    e.preventDefault();
    console.log('this.state :: ', this.state);

    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  //   handleSubmitUncontrolledComponent = (e) => {
  //     e.preventDefault();
  //     console.log(this.emailInputRef);
  //     console.log(this.passwordInputRef);
  //   };

  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="field">
          {/* <button onClick={this.handleSubmitUncontrolledComponent}> */}
          {inProgress ? (
            <button
              onClick={this.handleSubmitControlledComponent}
              disabled={inProgress}
            >
              Logging In...
            </button>
          ) : (
            <button onClick={this.handleSubmitControlledComponent}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
