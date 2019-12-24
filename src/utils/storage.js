export function setStorage(name, content) {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * get localStorage
 */
export function getStorage(name) {
  if (!name) return false;
  let content = window.localStorage.getItem(name);
  if (content && content !== 'undefined' && content !== 'null') {
    if (content.startsWith('{') || content.startsWith('[')) {
      content = JSON.parse(content);
    }
  } else {
    content = null;
  }
  return content;
}

/**
 * delete localStorage
 */
export function removeStorage(name) {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/*
 * set sessionStorage
 */
export function setSessionStorage(name, content) {
  if (!name) return;
  let contentNew;
  if (typeof content !== 'string') {
    contentNew = JSON.stringify(content);
  } else {
    contentNew = content;
  }
  window.sessionStorage.setItem(name, contentNew);
}
/**
 * get sessionStorage
 */
export function getSessionStorage(name) {
  if (!name) return false;
  let content = window.sessionStorage.getItem(name);
  if (content && content !== 'undefined' && content !== 'null') {
    if (content.startsWith('{') || content.startsWith('[')) {
      content = JSON.parse(content);
    }
  } else {
    content = null;
  }
  return content;
}
/**
 * delete localStorage
 */
export function removeSessionStorage(name) {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}
