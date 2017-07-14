import * as ActionTypes from '../constant'

export default function base (state = false, action = {}) {
  switch (action.type) {
    case ActionTypes.SHOW_LOADING : {
      return true
    }
    case ActionTypes.HIDE_LOADING : {
      return false
    }
    default: {
      return state
    }
  }
}
