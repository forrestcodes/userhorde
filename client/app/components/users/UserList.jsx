import React from 'react';
import UserListRow from "./UserListRow";
import ReactPaginate from 'react-paginate';
import styles from './users.scss';

const UserList = (props) => {

  const renderUserRows = () => {
    let array = props.users.map((user) => {
      return <UserListRow key={user.id} user={user} editUser={props.onClickUserRow}/>
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
          <table className={`${styles.table} table-sm`}>
            <thead>
            <tr>
              <th className="text-left">
                Name
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('name')}>
                  {orderByTag('name')}
                </span>
              </th>
              <th className="text-left">
                Email
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('email')}>
                  {orderByTag('email')}
                </span>
              </th>
              <th className="text-left">
                Title
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('title')}>
                  {orderByTag('title')}
                </span>
              </th>
              <th className="text-right">
                Phone
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('phone')}>
                  {orderByTag('phone')}
                </span>
              </th>
              <th className="text-center">
                Status
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('active')}>
                  {orderByTag('active')}
                </span>
              </th>
              <th className="text-right">
                Created
                <span className="pl-2 hover" onClick={() => props.reOrderUsers('created_at')}>
                  {orderByTag('created_at')}
                </span>
              </th>
              <th className="text-right">
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

        <div className="row justify-content-center mt-5 mb-5">
          <div className="col">
            <nav>
              <ReactPaginate
                  pageCount={props.pageCount}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item hover'}
                  pageLinkClassName={'page-link hover'}
                  breakClassName={'page-link black hover'}
                  nextClassName={'page-link black hover'}
                  previousClassName={'page-link black hover'}
                  activeClassName={'active btn-dark'}
                  onPageChange={props.onPageChange}
              />
            </nav>
          </div>
        </div>
      </div>
  )
};

export default UserList;