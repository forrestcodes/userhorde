import React from 'react';
import NavBar from "./shared/NavBar";

export default class UserHordeApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      account: this.props.account,
      userList: [],
      currentView: this.setInitialView()
    };
  };

  setInitialView = () => {
    return 'userList'
    // return this.props.account && this.props.account.id ? 'userList' : 'login';
  };

  renderCurrentView = () => {
    switch (this.state.currentView) {
      case 'userList':
        return this.renderUsersList();
      default:
        return this.renderUsersList();
    }
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
    return (
        <div>
          <NavBar account={this.props.account}/>
          {this.renderCurrentView()}
        </div>
    );
  }
}
