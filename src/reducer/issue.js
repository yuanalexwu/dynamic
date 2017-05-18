import * as ActionTypes from '../constant'

export default function issue (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.ISSUE_TYPE_SELECT_SUCCESS : {
      const {data} = action
      return {...state, issueTypeSelect: data}
    }
    default: {
      return state
    }
  }
}
