import * as ActionType from '../constant'

export function getCustomerSelect () {
  return (dispatch) => {
    fetch('/api/customer').then(data => { // eslint-disable-line
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
