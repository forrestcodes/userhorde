import React from 'react';
import UserListRow from "./UserListRow";
import ReactPaginate from 'react-paginate';

const UserList = (props) => {

  const renderUserRows = () => {
    let array = props.users.map((user) => {
      return <UserListRow key={user.id} user={user}/>
    });
    console.log(array);
    return array;
  };

  const orderByTag = (attr) => {
      if (props.order.attribute !== attr) return String.fromCharCode(8595);
      let num = props.order.direction === 'desc' ? 8595 : 8593;
      return String.fromCharCode(num);
  };

  const renderTheTable = () => {
    return(
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
            <tr>
              <th>
                Name
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('name')}>
                  {orderByTag('name')}
                </span>
              </th>
              <th>
                Email
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('email')}>
                  {orderByTag('email')}
                </span>
              </th>
              <th>
                Title
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('title')}>
                  {orderByTag('title')}
                </span>
              </th>
              <th>
                Phone
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('phone')}>
                  {orderByTag('phone')}
                </span>
              </th>
              <th>
                Status
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('active')}>
                  {orderByTag('active')}
                </span>
              </th>
              <th>
                Created
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('created_at')}>
                  {orderByTag('created_at')}
                </span>
              </th>
              <th>
                Updated
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('updated_at')}>
                  {orderByTag('updated_at')}
                </span>
              </th>
            </tr>
            </thead>
            <tbody>
            {renderUserRows()}
            </tbody>
          </table>
        </div>
    )
  };

  return (
      <div>
        <div className="row">
          <div className="col">
            {renderTheTable()}
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col">
            <ReactPaginate
                pageCount={props.pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                containerClassName={'list-group list-group-horizontal'}
                pageClassName={'list-group-item hover'}
                breakClassName={'list-group-item hover'}
                nextClassName={'list-group-item hover'}
                previousClassName={'list-group-item hover'}
                activeClassName={'active btn-dark'}
                onPageChange={props.onPageChange}
            />
          </div>
        </div>
      </div>
  )
};

export default UserList;