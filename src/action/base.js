import * as ActionType from '../constant'

export function showLoading () {
  return dispatch => {
    const action = {
      type: ActionType.SHOW_LOADING
    }
    dispatch(action)
  }
}

export function hideLoading () {
  return dispatch => {
    const action = {
      type: ActionType.HIDE_LOADING
    }
    dispatch(action)
  }
}
