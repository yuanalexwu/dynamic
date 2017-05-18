import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const initState = {}
const middlewares = applyMiddleware(thunk)

export const store = createStore(reducer, initState, middlewares)
