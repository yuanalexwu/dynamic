import * as ActionTypes from '../constant'

export default function home (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.HOME_STATISTICS_SUCCESS : {
      const {statistics = {}} = action
      return {...state, statistics}
    }
    default: {
      return state
    }
  }
}
