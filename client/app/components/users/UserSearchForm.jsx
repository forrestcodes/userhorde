import React from 'react';
import layout from "../userhorde.scss";

const UserSearchForm = (props) => {
  return (
      <div className="row mt-3 mb-3">
        <div className="col">
          <form onSubmit={props.onsubmit} className="form-inline">
            <div className="input-group">
              <input type="text" className="form-control"
                     value={props.q}
                     onChange={props.onChange}
                     placeholder="Search name, phone, title, or email."
                     style={{width: '300px'}}
              />
              <div className="input-group-append">
                <button type='button' onClick={props.onClearSearch} className={`btn ${layout.btnOutlineDark}`}>Clear</button>
                <button type='submit' className={`btn ${layout.btnOutlineDark}`}>Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
};

export default UserSearchForm;