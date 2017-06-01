import * as ActionTypes from '../constant'

export default function home (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.HOME_INFO_SUCCESS : {
      const {data} = action
      return data
    }
    default: {
      return state
    }
  }
}
