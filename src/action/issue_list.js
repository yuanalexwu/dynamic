import * as ActionType from '../constant'
import {buildRequestUrl} from 'app/util'
import {notification} from 'antd'

export function getIssueList (query) {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/issuecenter/issue/list', query)
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(res => {
      const {status, data, msg: description = '', devmsg = ''} = res
      if (status === 200) {
        const action = {
          type: ActionType.ISSUE_LIST_SUCCESS,
          data: data
        }
        dispatch(action)
      } else {
        notification.warning({message: '出现问题', description})
        console.log(devmsg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
