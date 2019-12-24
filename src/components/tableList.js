/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Table } from 'antd';
import { setSessionStorage } from '../utils/storage';

const TableList = ({ list, loading, history }) => {
  const statusArr = ['China', 'U.S.A', 'Germany', 'Japan'];
  const colorsArr = ['#96f54d', '#fdd13f', '#f3483f', '#0296f1'];
  const colorsTab = ['red', 'blue', 'yellow', 'white', 'black', 'green', 'gray'];
  const modes = { a: 'Standalone', b: 'Co-financing', c: 'Stock financing' };
  const allPriorities = {
    d: 'Sustainable Infrastructure',
    e: 'Cross Border Connectivity',
    f: 'Private Capital Mobilization',
    g: 'None of above priorities'
  };

  const columns = [
    {
      title: 'Project Name',
      width: 220,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (text, row) => <u onClick={() => toProjectDetail(row)}>{text}</u>
    },
    {
      title: 'ID',
      width: 100,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      sorter: (a, b) => a.key - b.key
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: 150,
      render: text => <span style={{ color: colorsArr[text] }}>{statusArr[text]}</span>
    },
    {
      title: 'Effective Date',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
      width: 200,
      sorter: (a, b) => a.effectiveDate - b.effectiveDate,
      render: text => <span style={{ color: '#6f0404' }}>{text}</span>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 240
    },
    {
      title: 'Natural',
      dataIndex: 'natural',
      key: 'natural',
      width: 200
    },
    {
      title: 'Color',
      dataIndex: 'colors',
      key: 'colors',
      width: 300,
      render: colors => <span>{colorsTab.slice(colors).join(' ')}</span>
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      width: 100
    },
    {
      title: 'Support',
      dataIndex: 'support',
      key: 'support',
      width: 150,
      render: support => <span>{support ? 'Support' : 'Not supported'}</span>
    },
    {
      title: 'financing mode',
      dataIndex: 'mode',
      key: 'mode',
      width: 200,
      render: mode => <span>{modes[mode]}</span>
    },
    {
      title: 'Thematic Priorities',
      dataIndex: 'priorities',
      key: 'priorities',
      width: 600,
      render: priorities => <span>{allPriorities[priorities]}</span>
    }
  ];
  const toProjectDetail = row => {
    history.push({ pathname: `${process.env.PUBLIC_URL}/dashboard/projectDetail`, state: row });
    setSessionStorage('project-detail', row);
  };
  return (
    <Table
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={{ pageSize: 15 }}
      rowClassName={(_record, index) => (index % 2 === 0 ? 'dark-color' : 'light-color')}
      scroll={{ x: 1500, y: '64vh' }}
    ></Table>
  );
};

export default TableList;
