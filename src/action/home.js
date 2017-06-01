import * as ActionType from '../constant'

export function getHomeInfo () {
  return (dispatch) => {
    fetch('/api/home/info').then(data => { // eslint-disable-line
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
