import React from 'react';

const UserListRow = (props) => {
  const activeRow = (user) => {
    let color = user.active ? 'green' : 'red';
    let label = user.active ? 'Active' : 'Inactive';
    return (
        <td style={{color: color}}>{label}</td>
    )
  };

  const theUsersRow = () => {
    return(
        <tr>
          <td>{props.user.name}</td>
          <td>{props.user.email}</td>
          <td>{props.user.title}</td>
          <td>{props.user.phone}</td>
          {activeRow(props.user)}
          <td>{props.user.created_at_formatted}</td>
          <td>{props.user.updated_at_formatted}</td>
        </tr>
    )
  };

  return theUsersRow()
};

export default UserListRow;