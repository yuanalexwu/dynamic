import * as ActionType from '../constant'

export function getDeviceSelectByCustomer (customerNo) {
  return dispatch => {
    if (!customerNo) {
      return
    }
    const path = `/api/device/${customerNo}`
    fetch(path)// eslint-disable-line
    .then(data => {
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
