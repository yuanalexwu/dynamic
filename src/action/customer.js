import * as ActionType from '../constant'
import {buildRequestUrl} from '../util'

export function getCustomerSelect () {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/usercenter/customer/select')
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const action = {
        type: ActionType.CUSTOMER_SELECT_SUCCES,
        data: data
      }
      dispatch(action)
    }).catch(err => {
      console.log(err)
    })
  }
}
