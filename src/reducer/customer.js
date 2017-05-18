import * as ActionTypes from '../constant'

export default function customer (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.CUSTOMER_SELECT_SUCCES : {
      const {data} = action
      return {...state, customerSelect: data}
    }
    default: {
      return state
    }
  }
}
