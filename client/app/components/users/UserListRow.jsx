import React from 'react';
import styles from './users.scss';

const UserListRow = (props) => {

  const theUsersRow = () => {
    let label = props.user.active ? 'Active' : 'Inactive';

    return(
        <tr className="hover clickable"
            onClick={() => props.editUser(props.user)}
        >
          <td className="text-left">{props.user.name}</td>
          <td className="text-left">{props.user.email}</td>
          <td className="text-left">{props.user.title}</td>
          <td className="text-right">{props.user.phone}</td>
          <td className={`text-center ${styles[label.toLowerCase()]}`}>
            {label}
          </td>
          <td className="text-right">{props.user.created_at_short}</td>
          <td className="text-right">{props.user.updated_at_short}</td>
        </tr>
    )
  };

  return theUsersRow()
};

export default UserListRow;