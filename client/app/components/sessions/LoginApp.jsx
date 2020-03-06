import React from 'react';
import LoginForm from "./LoginForm";
import {setHeaders} from "../../helpers/RequestHelpers";

export default class LoginApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      session: {
        login: '',
        password: ''
      }
    }
  }

  handleSubmit = (e) => {
    if (e) e.preventDefault();

    let payload = {session: {...this.state.session}};
    let submitRequest = $.ajax({
      url: '/sessions',
      type: 'POST',
      headers: setHeaders(),
      data: payload
    });

    submitRequest.then((result) => {
      if (result.errors) {
        this.setState({errors: result.errors});
      } else {
        window.location = '/users'
      }
    }, (error) => {
      console.log(error)
    })
  };

  handleInputChange = (e) => {
    let {name, value} = e.target;
    let session = {...this.state.session};
    session[name] = value;
    this.setState({session: session})
  };

  render() {
    return(
        <LoginForm
            session={this.state.session}
            onInputChange={this.handleInputChange}
            onSubmit={this.handleSubmit}
        />
    )
  }
}