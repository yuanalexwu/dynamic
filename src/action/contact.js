import * as ActionType from '../constant'

export function getContactSelect () {
  return (dispatch) => {
    fetch('/api/contact').then(data => { // eslint-disable-line
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
