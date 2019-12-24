import ajax from '../utils/ajax';

const serverPre = ajax.serverUrl;
const serverName = '/project-manage/';

export function getProjectListApi(data) {
  return ajax.get(serverPre(`${serverName}project/list`), data);
}

export function updateProjectApi(data) {
  return ajax.post(serverPre(`${serverName}project/update`), data);
}
