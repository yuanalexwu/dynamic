import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import { store } from './store'

const root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))
