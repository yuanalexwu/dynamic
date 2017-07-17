import * as ActionType from '../constant'
import {buildRequestUrl, warnNotification} from '../util'

export function getIssueTypeSelect () {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/issuecenter/issue_type/select')
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(res => {
      const {status, data, msg: description = '', devmsg = ''} = res
      if (status === 200) {
        const action = {
          type: ActionType.ISSUE_TYPE_SELECT_SUCCESS,
          data: data
        }
        dispatch(action)
      } else {
        warnNotification({description})
        console.log(devmsg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
