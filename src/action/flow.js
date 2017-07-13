import * as ActionType from '../constant'
import {buildRequestUrl, parsePathWithAppPrefix} from 'app/util' // eslint-disable-line
import {notification} from 'antd'

export function getFlowList (userId) {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/issuecenter/process/select')
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(res => {
      const {status, data, msg: description = '', devmsg = ''} = res
      if (status === 200) {
        const action = {
          type: ActionType.FLOW_LIST_SUCCESS,
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

export function createIssue (pro_uid, history) {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/issuecenter/issue/create', {pro_uid})
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(res => {
      const {status, data, msg: description = '', devmsg = ''} = res
      if (status === 200) {
        const {issueId} = data
        history.push(parsePathWithAppPrefix(`/edit_issue/${issueId}`))
      } else {
        notification.warning({message: '出现问题', description})
        console.log(devmsg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
