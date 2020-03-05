import React from 'react';
import LoginApp from "./sessions/LoginApp";

export default class UserHordeApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      account: {},
      userList: [],
      currentView: this.setInitialView()
    };
  };

  setInitialView = () => {
    return this.props.account && this.props.account.id ? 'userList' : 'login';
  };

  renderCurrentView = () => {
    switch (this.state.currentView) {
      case 'login':
        return this.renderLoginPage();
      case 'userList':
        return this.renderUsersList();
      default:
        return this.renderLoginPage();
    }
  };

  setAccount = (account) => {
    this.setState({account: {...this.state.account, account}})
  };

  renderLoginPage = () => {
    return <LoginApp onLoginSuccess={this.setAccount}/>
  };

  renderUsersList = () => {
    return (
        <div>
          <h1>Hello!</h1>
          <h4>Here are users.</h4>
        </div>
    )
  };

  render() {
    return (this.renderCurrentView());
  }
}
