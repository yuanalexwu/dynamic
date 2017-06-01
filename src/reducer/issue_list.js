import * as ActionTypes from '../constant'

export default function issueList (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.ISSUE_LIST_SUCCESS : {
      const {data} = action
      return data
    }
    default: {
      return state
    }
  }
}
