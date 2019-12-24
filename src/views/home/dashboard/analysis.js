import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import TableList from '../../../components/tableList';
import actions from '../../../actions/index';

const { Search } = Input;

const Analysis = ({ history }) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(actions.project.getProjectListAction())
      .then(res => {
        // console.log(res.list);
        setLoading(false);
        setList(res.list);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
    return () => {};
  }, []);
  const addProject = () => {
    history.push({ pathname: `${process.env.PUBLIC_URL}/dashboard/projectDetail` });
  };
  return (
    <div>
      <div className='h-search'>
        <Search
          enterButton='Search'
          onSearch={val => console.log(val)}
          placeholder='Project Name or ID'
          style={{ width: 400 }}
        />
        <div className='h-actions'>
          <Button onClick={addProject} type='primary'>
            Add
          </Button>
        </div>
      </div>
      <TableList history={history} list={list} loading={loading}></TableList>
    </div>
  );
};

export default Analysis;
