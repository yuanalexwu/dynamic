import * as ActionTypes from '../constant'

export default function contact (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.CONTACT_SELECT_SUCCESS : {
      const {data} = action
      return {...state, contactSelect: data}
    }
    default: {
      return state
    }
  }
}
