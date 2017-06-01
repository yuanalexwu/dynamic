import * as ActionType from '../constant'
import {buildRequestUrl} from 'app/util'

export function getIssueList (query) {
  return (dispatch) => {
    const path = buildRequestUrl('/api/issue_list', query)
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const action = {
        type: ActionType.ISSUE_LIST_SUCCESS,
        data: data
      }
      dispatch(action)
    }).catch(err => {
      console.log(err)
    })
  }
}
