import * as ActionType from '../constant'
import {buildRequestUrl} from '../util'

export function getIssueTypeSelect () {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/issuecenter/issue_type/select')
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const action = {
        type: ActionType.ISSUE_TYPE_SELECT_SUCCESS,
        data: data
      }
      dispatch(action)
    }).catch(err => {
      console.log(err)
    })
  }
}
