import * as ActionTypes from '../constant'

export default function flow (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.FLOW_LIST_SUCCESS : {
      const {data} = action
      return {...state, flowList: data}
    }
    default: {
      return state
    }
  }
}
