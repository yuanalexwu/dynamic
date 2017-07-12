import * as ActionType from '../constant'
import {buildRequestUrl} from '../util'

export function getDeviceSelectByCustomer (custId) {
  return dispatch => {
    if (!custId) {
      return
    }
    const path = buildRequestUrl('/gw/devicecenter/device/select', {custId})
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(data => {
      const action = {
        type: ActionType.DEVICE_SELECT_SUCCES,
        data
      }
      dispatch(action)
    }).catch(err => {
      console.log(err)
    })
  }
}
