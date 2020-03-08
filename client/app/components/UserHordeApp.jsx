import React from 'react';
import NavBar from "./shared/NavBar";
import UserList from "./users/UserList";
import {setHeaders} from "../helpers/RequestHelpers";
import UserSearchForm from "./users/UserSearchForm";

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
      },
      q: ''
    };
  };

  fetchUsersOptions = (override={}) => {

  };

  getUsers = () => {
    let search = this.state.q;
    let url = `/users?page=${this.state.currentPageNum}&sort_attr=${this.state.order.attribute}&sort_dir=${this.state.order.direction}`;

    if (search && search.length > 0) {
      url = `${url}&q=${search}`
    }

    let fetchUsers = $.ajax({
      url: url,
      type: 'GET',
      headers: setHeaders(),
      dataType: 'json',
      contentType: 'application/json'
    });

    fetchUsers.then((response) => {
      if (!response.errors && response.users.length) {
        this.setState({users: response.users, userPageCount: response.user_page_count})
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

  onSearchSubmit = (e) => {
    if (e) e.preventDefault();
    this.getUsers();
  };

  onSearchInputChange = (e) => {
      let {value} = e.target;
      this.setState({q: value})
  };

  renderUsersList = () => {
    return (
        <div>
          <UserSearchForm
              onsubmit={this.onSearchSubmit}
              q={this.state.q}
              onChange={this.onSearchInputChange}
          />
          <UserList
              account={this.state.account}
              users={this.state.users}
              pageCount={this.state.userPageCount}
              onPageChange={this.changeUserListPage}
              order={this.state.order}
              reOrderUsers={this.reOrderUserList}
          />
        </div>
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
