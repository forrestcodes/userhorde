import React from 'react';
import LoginForm from "./LoginForm";

export default class LoginApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      account: {
        login: '',
        phone: '',
        password: ''
      }
    }
  }

  validateAccount = (account) => {
    return true
  };

  handleSubmit = (e) => {

  };

  handleInputChange = (e) => {
    let {name, value} = e.target;
    let account = {...this.state.account};
    account[name] = value;
    this.setState({account: account})
  };

  render() {
    return(
        <LoginForm
            account={this.state.account}
            onInputChange={this.handleInputChange}
            onSubmit={this.handleSubmit}
        />
    )
  }
}