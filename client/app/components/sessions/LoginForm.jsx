import React from 'react';

export default class LoginForm extends React.Component {
    render() {
      return(
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-sm-4">
                <form onSubmit={this.props.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input type="text" name="login" id="login"
                           className="form-control"
                           onChange={this.props.onInputChange}
                           value={this.props.session.login}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"
                           className="form-control"
                           onChange={this.props.onInputChange}
                           value={this.props.session.password}
                    />
                  </div>

                  <button className="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
      )
    }
}