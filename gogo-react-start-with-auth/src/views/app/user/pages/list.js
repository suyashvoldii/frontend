/* eslint-disable react/display-name */
import { React, useState, useEffect } from 'react';
import { listUser } from 'api/userControl';
import { Table } from 'antd';
// import { Redirect } from 'react-router-dom';
// import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useHistory, Link } from 'react-router-dom';
// import AddNewModal from 'containers/pages/AddNewModal';1

function List() {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  // function editUser(data) {
  //   console.log(data.user_id);
  // }
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'user_id',
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'fullname',
    },
    {
      key: '3',
      title: 'Company',
      dataIndex: 'company_id',
    },
    {
      key: '4',
      title: 'Actions',
      // eslint-disable-next-line react/display-name
      // eslint-disable-next-line no-unused-vars
      render: (record) => (
        // <Button type="submit" onClick={() => editUser(record)}>
        //   Primary Button
        // </Button>

        // eslint-disable-next-line react/destructuring-assignment
        <Link to={`edit/${record.user_id}`}>
          <span className="update">update</span>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await listUser();
        console.log(response);
        setUsers(response.data.data);
      } catch (err) {
        if (!err?.response) {
          setErrorMessages('No server Response');
        } else if (err.response?.status === 401) {
          setErrorMessages('Username Taken');
        } else {
          setErrorMessages('Failed');
        }
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={users} />
      </header>
    </div>
  );
}

export default List;
