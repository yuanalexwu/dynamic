import {APP_PATH_PREFIX} from 'app/common'

export function getUserInfo () {
  return {}
}

export function getMenu () {
  return [
        {name: '首页', path: '/', icon: 'home'},
        {name: '工单列表', path: '/issue_list', icon: 'user'},
        {name: '创建工单', path: '/create_issue', icon: 'user'},
  ]
}

export function parsePathWithAppPrefix (path) {
  return `${APP_PATH_PREFIX}${path}`
}
