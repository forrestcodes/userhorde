import React from 'react';

const UserForm = (props) => {
  return (
      <form onSubmit={(e) => props.onSave('', e)}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" id="name" className="form-control"
                 placeholder={'Name'}
                 onChange={props.onInputChange}
                 value={props.user.name}
          />
        </div>


        <div className="form-group">
          <label>Email</label>
          <input type="text" name="email" id="email" className="form-control"
                 placeholder={'Email'}
                 onChange={props.onInputChange}
                 value={props.user.email}
          />
        </div>


        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" id="title" className="form-control"
                 placeholder={'Title'}
                 onChange={props.onInputChange}
                 value={props.user.title}
          />
        </div>


        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" id="phone" className="form-control"
                 placeholder={'Phone'}
                 onChange={props.onInputChange}
                 value={props.user.phone}
          />
        </div>


        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="active" name="active"
                 checked={props.user.active}
                 onChange={props.onInputChange}
          />
          <label className="form-check-label" htmlFor="inlineFormCheck">
            Active Status?
          </label>
        </div>

      </form>
  )
};

export default UserForm;