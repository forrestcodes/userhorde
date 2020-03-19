import React from 'react';
import {setHeaders} from "../../helpers/RequestHelpers";
import layout from "../userhorde.scss";

const NavBar = (props) => {
  const signOutLink = () => {
    if (props.account && props.account.id) {
      return (
          <li className="nav-item">
            <button type="button" className="btn btn-light" onClick={signOut}>Sign Out</button>
          </li>
      )
    }
  };

  const signOut = () => {
    let submitRequest = $.ajax({
      url: `/sessions/${props.account.id}`,
      type: 'DELETE',
      headers: setHeaders()
    });

    submitRequest.then((response) => {
      window.location = '/'
    })
  };

  return (
      <nav className={`navbar ${layout.navbarDark}`}>
        <span className="navbar-brand mb-0 h1">UserHorde</span>
        <ul className="navbar-nav">
          {signOutLink()}
        </ul>
      </nav>
  )

};

export default NavBar;