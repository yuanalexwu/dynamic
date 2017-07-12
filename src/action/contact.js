import * as ActionType from '../constant'
import {buildRequestUrl} from '../util'

export function getContactSelect (custId) {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/usercenter/contact/select', {custId})
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const action = {
        type: ActionType.CONTACT_SELECT_SUCCESS,
        data: data
      }
      dispatch(action)
    }).catch(err => {
      console.log(err)
    })
  }
}
