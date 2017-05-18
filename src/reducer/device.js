import * as ActionTypes from '../constant'

export default function device (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.DEVICE_SELECT_SUCCES : {
      const {data} = action
      return {...state, deviceSelect: data}
    }
    default: {
      return state
    }
  }
}
