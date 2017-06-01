import {APP_PATH_PREFIX, DEFAULT_ISSUE_LIST_STAT} from 'app/common'

export function getUserInfo () {
  return {userId: '123131', name: 'dan_zhu'}
}

export function getMenu () {
  return [
        {name: '首页', path: '/', icon: 'home'},
        {name: '工单列表', path: `/issue_list/${DEFAULT_ISSUE_LIST_STAT}`, icon: 'user'},
        {name: '创建工单', path: '/create_issue', icon: 'user'},
  ]
}

export function parsePathWithAppPrefix (path) {
  return `${APP_PATH_PREFIX}${path}`
}

export function logout (history) {
  // TODO clear user info and redirect to login page
  history.push(parsePathWithAppPrefix('/login'))
}

export function buildRequestUrl (url, query = {}) {
  if (!url) {
    url = '/'
  }
  const queryList = []
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      queryList.push(`${key}=${query[key]}`)
    }
  }
  queryList.push(`t=${new Date().getTime()}`)
  if (queryList.length) {
    const queryStr = queryList.join('&')
    url = `${url}?${queryStr}`
  }

  return url
}
