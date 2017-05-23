export function isLogin() {
    return true
}

export function getMenu() {
    return [
        {name: '首页', path: '', icon: 'home'},
        {name: '工单列表', path: 'issue_list', icon: 'user'},
        {name: '创建工单', path: 'create_issue', icon: 'user'},
    ]
}