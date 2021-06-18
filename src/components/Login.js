import React from 'react';

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
  };
  //   handleSubmitUncontrolledComponent = (e) => {
  //     e.preventDefault();
  //     console.log(this.emailInputRef);
  //     console.log(this.passwordInputRef);
  //   };

  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
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
          <button onClick={this.handleSubmitControlledComponent}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
