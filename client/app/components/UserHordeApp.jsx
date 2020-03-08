import React from 'react';
import NavBar from "./shared/NavBar";
import UserList from "./users/UserList";
import {setHeaders} from "../helpers/RequestHelpers";

export default class UserHordeApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      account: this.props.account,
      users: this.props.users || [],
      currentView: 'userList',
      userPageCount: this.props.total_pages,
      currentPageNum: '1',
      order: {
        attribute: 'updated_at',
        direction: 'desc'
      }
    };
  };

  fetchUsersOptions = (override={}) => {

  };

  getUsers = () => {
    let fetchUsers = $.ajax({
      url: `/searches/users?page=${this.state.currentPageNum}&sort_attr=${this.state.order.attribute}&sort_dir=${this.state.order.direction}`,
      type: 'GET',
      headers: setHeaders(),
      contentType: 'application/json'
    });

    fetchUsers.then((response) => {
      if (!response.errors && response.users.length) {
        let users = response.users;
        this.setState({users})
      }
    }, (error) => {
      console.log(error)
    })
  };

  renderCurrentView = () => {
    switch (this.state.currentView) {
      case 'userList':
        return this.renderUsersList();
      default:
        return this.renderUsersList();
    }
  };

  changeUserListPage = (page) => {
    let currentPageNum = page.selected + 1;
    if (currentPageNum > this.state.userPageCount) return;
    this.setState({currentPageNum}, () => {
      this.getUsers();
    });
  };

  reOrderUserList = (attr) => {
    let order = {...this.state.order};

    if (attr === order.attribute) {
      order.direction = order.direction === 'desc' ? 'asc' : 'desc'
    } else {
      order.attribute = attr;
      order.direction = 'desc';
    }

    this.setState({order}, () => {
      this.getUsers()
    });
  };

  renderUsersList = () => {
    return (
        <UserList
            account={this.state.account}
            users={this.state.users}
            pageCount={this.state.userPageCount}
            onPageChange={this.changeUserListPage}
            order={this.state.order}
            reOrderUsers={this.reOrderUserList}
        />
    )
  };

  render() {
    return (
        <div>
          <NavBar account={this.props.account}/>
          <div className="container-fluid">
            {this.renderCurrentView()}
          </div>
        </div>
    );
  }
}
