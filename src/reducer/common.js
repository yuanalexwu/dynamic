import * as ActionTypes from '../constant'

export default function common (state = [], action = {}) {
  switch (action.type) {
    case ActionTypes.GET_JSON_CONFIG_SUCCES : {
      const {config} = action
      return config
    }
    case ActionTypes.CLEAR_JSON_CONFIG_SUCCES : {
      return {}
    }
    default: {
      return state
    }
  }
}
