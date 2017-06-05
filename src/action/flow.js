import * as ActionType from '../constant'
import {buildRequestUrl, parsePathWithAppPrefix} from 'app/util'

export function getFlowList (query) {
  return (dispatch) => {
    const path = buildRequestUrl('/api/flow_list', query)
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
    const path = buildRequestUrl(`/api/create_issue/${flowId}`)
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const {issueId} = data
      history.push(parsePathWithAppPrefix(`/edit_issue/${issueId}`))
    }).catch(err => {
      console.log(err)
    })
  }
}
