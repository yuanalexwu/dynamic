import * as ActionType from '../constant'

export function getIssueTypeSelect () {
  return (dispatch) => {
    fetch('/api/issue_type').then(data => { // eslint-disable-line
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
