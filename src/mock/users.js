import { arrayFind } from './util';

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    name: 'React hui'
  },
  {
    id: 2,
    username: 'user1',
    password: 'password',
    name: 'User one'
  }
];

export default {
  'post|/ms-base-server/jwt/token': options => {
    let token = '';
    let status = 401;
    const user = JSON.parse(options.body);
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].username === user.username && users[i].password === user.password) {
        token =
          'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkMTAxNDY4YWNhZjM0ZGRhYmFjOTY0NmQyZDkyMDExMyIsImlkIjoiZDEwMTQ2OGFjYWYzNGRkYWJhYzk2NDZkMmQ5MjAxMTMiLCJjb2RlIjoiYWRtaW4iLCJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwiZXhwIjoxNTcxOTg4MzkwfQ.etLx6wELsJwWAHn8fxgz4qLjfuuPHlMiZpc1d2eULt1zpIdIEZulljbSreOcf60mUsNB_yXTHeJR6-tMAYB9hIRNy6-UeKipJ12xxv4S-3JLg7NceQ84-N30IA6RaODAPTk6YyZ5DGUyWmvGJGlYY0f0JR304c41twgJ1zfgwCI';
        status = 200;
        break;
      }
    }
    return {
      status,
      message: 'success',
      data: {
        state: 20101,
        token
      }
    };
  },
  'get|/authVerify': options => {
    const params = 'longtimenoseeIamdyingtoseeyou-1';
    const userId = parseInt(params.split('-')[1], 10); // 转化为10进制数字 待调查
    const user = arrayFind(users, 'id', userId);
    user.name = user.username;
    console.log(options);
    return {
      status: user ? 200 : 404,
      message: 'success',
      data: user
    };
  },
  'post|/ms-base-server/jwt/logout': () => ({
    status: 200,
    message: 'success',
    data: 'ok'
  })
};
