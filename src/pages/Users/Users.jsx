import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination } from 'antd';

import {getAllUsers} from "../../requests/reqeusts";

import { usersColumnNames } from "../../constants/usersColumnNames";

const Users = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [usersData, setUsersData] = useState()
  const [loading,setLoading] = useState()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await getAllUsers({start: page})
      setUsersData(response.data.map(user => {
        const {name, username, email, address, id } = user
        const { street, suite, city, zipcode } = address
        return {
          fullName: name + ' ' + username,
          email,
          address: [street, suite, city, zipcode].join(', '),
          id: id
        }
      }))
      setLoading(false)
    })()
  },[page])

  return (
    <div>
      Users
      {loading ? <div>Loading</div> : <><Table  onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            navigate(`/invite-new-user/${record.id}`)
          },
        };
      }} columns={usersColumnNames} dataSource={usersData} pagination={false}/>
        <Pagination className='user-table-pagination' defaultCurrent={page} total={50} onChange={(page, pageSize) => setPage(page)}/>
      </>}
    </div>
  );
};

export default Users;
