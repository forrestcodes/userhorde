import React from 'react';

const UserSearchForm = (props) => {
  return (
      <div className="row mt-3 mb-3">
        <div className="col">
          <form onSubmit={props.onsubmit} className="form-inline">
            <input type="text" className="form-control"
                   value={props.q}
                   onChange={props.onChange}
                   placeholder="Search name, phone, title, or email."
                   style={{width: '300px'}}
            />

            <button className="btn btn-dark">Search</button>
          </form>
        </div>
      </div>
  )
};

export default UserSearchForm;