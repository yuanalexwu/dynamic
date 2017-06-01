import { combineReducers } from 'redux'
import common from './common'
import customer from './customer'
import device from './device'
import issue from './issue'
import contact from './contact'
import home from './home'
import issueList from './issue_list'

const reducer = combineReducers({
  customer,
  device,
  issue,
  contact,
  common,
  home,
  issueList
})

export default reducer
