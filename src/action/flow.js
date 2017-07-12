import * as ActionType from '../constant'
import {buildRequestUrl, parsePathWithAppPrefix} from 'app/util' // eslint-disable-line

export function getFlowList (userId) {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/issuecenter/process/select')
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const action = {
        type: ActionType.FLOW_LIST_SUCCESS,
        data: data
      }
      dispatch(action)
    }).catch(err => {
      console.log(err)
    })
  }
}

export function createIssue (flowId, history) {
  return (dispatch) => {
    fetch(`/gw/issuecenter/issue/create?pro_uid=${flowId}`).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const {issueId} = data
      history.push(parsePathWithAppPrefix(`/edit_issue/${issueId}`))
    }).catch(err => {
      console.log(err)
    })
  }
}
