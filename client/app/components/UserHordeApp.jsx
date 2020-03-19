import React from 'react';
import NavBar from "./shared/NavBar";
import UserList from "./users/UserList";
import {setHeaders} from "../helpers/RequestHelpers";
import UserSearchForm from "./users/UserSearchForm";
import {Modal, Alert} from 'react-bootstrap';
import UserForm from "./users/UserForm";
import layout from "./userhorde.scss";

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
      q: '',
      currentUser: this.blankUser(),
      modalOpen: false,
      currentUserErrorString: ''
    };
  };

  blankUser = () => {
    return {
      name: '',
      email: '',
      title: '',
      phone: '',
      active: true,
    }
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

  onClickUserRow = (user) => {
    this.setState({modalOpen: true, currentUser: user})
  };

  closeModal = () => {
      this.setState({modalOpen: false, currentUser: this.blankUser(), currentUserErrorString: ''})
  };

  onCurrentUserInputChange = (e) => {
      let {name} = e.target;
      let value;
      let currentUser = {...this.state.currentUser};

      if (name === 'active') {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }

      currentUser[name] = value;
      this.setState({currentUser})
  };

  currentUserOnSave = (deleteing='delete', e=null) => {
    if (e) e.preventDefault();

    let currentUser = {...this.state.currentUser};
      let payload = {user: currentUser};
      let url, type;

      if (deleteing === 'delete') {
        url = `/users/${currentUser.id}`;
        type = 'DELETE'
      } else if (currentUser.id) {
        url = `/users/${currentUser.id}`;
        type = 'PATCH';
      } else {
        url = '/users';
        type = 'POST';
      }

      let saveUser = $.ajax({
        url: url,
        type: type,
        data: JSON.stringify(payload),
        headers: setHeaders(),
        dataType: 'json',
        contentType: 'application/json'
      });

      saveUser.then((response) => {
        if (response.errors) {
          this.setState({currentUserErrorString: response.errors})
        } else {
          this.closeModal();
          this.getUsers();
        }
      }, (errors) => {
        console.log(errors)
      })
  };

  renderUserErrors = () => {
    let errorString = this.state.currentUserErrorString;
      if (errorString && errorString.length) {
        return(
            <Alert variant="danger">
              {errorString}
            </Alert>
        )
      }
  };

  renderDeleteButton = (currentUser) => {
      if (currentUser.id) {
        return <button className={`btn ${layout.btnOutlineDanger} pull-left`} type='button' onClick={() => this.currentUserOnSave('delete')}>Delete</button>
      }
  };

  renderModal = () => {
    let currentUser = {...this.state.currentUser};
    let title = currentUser.id ? 'Edit User' : 'Create New User';

      return (
          <Modal show={this.state.modalOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.renderUserErrors()}

              <UserForm
                  user={currentUser}
                  onInputChange={this.onCurrentUserInputChange}
                  onSave={this.currentUserOnSave}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="container">

              <div className="row">
                <div className="col-6 text-left">
                  {this.renderDeleteButton(currentUser)}
                </div>

                <div className="col-6 text-right">
                  <button className="btn" type='button' onClick={this.closeModal}>Cancel</button>
                  <button className={`btn ${layout.btnOutlineSuccess}`} onClick={this.currentUserOnSave}>Save</button>
                </div>
              </div>
              </div>
            </Modal.Footer>
          </Modal>
      )
  };

  onClearSearch = () => {
      this.setState({q: ''}, () => {
        this.getUsers();
      });
  };

  renderUsersList = () => {
    return (
        <div>
          <div className="row">
            <div className="col col-md-6">
              <UserSearchForm
                  onsubmit={this.onSearchSubmit}
                  q={this.state.q}
                  onChange={this.onSearchInputChange}
                  onClearSearch={this.onClearSearch}
              />
            </div>
            <div className="col col-md-6 text-right mt-3 mb-3">
              <button type="button" className={`btn ${layout.btnOutlineSuccess}`} onClick={() => this.onClickUserRow(this.blankUser())}>New User</button>
            </div>
          </div>

          <UserList
              account={this.state.account}
              users={this.state.users}
              pageCount={this.state.userPageCount}
              onPageChange={this.changeUserListPage}
              order={this.state.order}
              reOrderUsers={this.reOrderUserList}
              onClickUserRow={this.onClickUserRow}
          />
        </div>
    )
  };

  render() {
    return (
        <div>
          <NavBar account={this.props.account}/>
          <div className="container-fluid">
            {this.renderUsersList()}
            {this.renderModal()}
          </div>
        </div>
    );
  }
}
