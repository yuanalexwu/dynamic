import { combineReducers } from 'redux'
import common from './common'
import customer from './customer'
import device from './device'
import issue from './issue'
import contact from './contact'

const reducer = combineReducers({
  customer,
  device,
  issue,
  contact,
  common
})

export default reducer
