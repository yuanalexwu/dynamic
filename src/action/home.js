import * as ActionType from '../constant'
import {buildRequestUrl} from '../util'

export function getHomeInfo () {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/issuecenter/home')
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const action = {
        type: ActionType.HOME_INFO_SUCCESS,
        data
      }
      dispatch(action)
    }).catch(err => {
      console.log(err)
    })
  }
}
