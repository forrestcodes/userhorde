import React from 'react';
import { Form } from 'react-bootstrap';

const UserForm = (props) => {
  const timestamps = () => {
    if (props.user.id) {
      return (
          <div className="mt-2">
            <div className="row">
              <div className="col">
                <small>Last Update: {props.user.updated_at_long}</small>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <small>Created At: {props.user.created_at_long}</small>
              </div>
            </div>
          </div>
      )
    }
  };
  return (
      <form onSubmit={(e) => props.onSave('', e)}>
        <div className="form-group">
          <label>Name *</label>
          <input type="text" name="name" id="name" className="form-control"
                 placeholder={'Name'}
                 onChange={props.onInputChange}
                 value={props.user.name}
                 required={true}
          />
        </div>


        <div className="form-group">
          <label>Email *</label>
          <input type="text" name="email" id="email" className="form-control"
                 placeholder={'Email'}
                 onChange={props.onInputChange}
                 value={props.user.email}
                 required={true}
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
          <label>Phone *</label>
          <input type="text" name="phone" id="phone" className="form-control"
                 placeholder={'Phone'}
                 onChange={props.onInputChange}
                 value={props.user.phone}
                 required={true}
          />
        </div>


        <Form.Check
            type="switch"
            id="active"
            name="active"
            label="Active?"
            checked={props.user.active}
            onChange={props.onInputChange}
        />

        {timestamps()}

      </form>
  )
};

export default UserForm;