import ajax from '../utils/ajax';

const serverPre = ajax.serverUrl;
// serverName 加'/' 则报地址为404
const serverName = '/ms-base-server/';
// const serverName = 'ms-base-server/';
// const editPwdServerName = '/auth-management/user/';
// export async function handleLogin(data){

//   return ajax.post(serverPre(`${serverName}jwt/token`),data)

// }

// export async function fetchPermissions(){
//   return ajax.post(serverPre(`${serverName}base/resource/list`));
// }

// export async function logout(){
//   return ajax.post(serverPre(`${serverName}jwt/logout`));
// }

// export async function editPassword(data){
//   return ajax.post(serverPre(`${editPwdServerName}password/updatePwd`,data))
// }

export function handleLoginApi(data) {
  return ajax.post(serverPre(`${serverName}jwt/token`), data);
}

export function handleLogoutApi() {
  return ajax.post(serverPre(`${serverName}jwt/logout`));
}
