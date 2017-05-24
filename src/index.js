import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import { store } from './store'
import Root from 'app/container/root'
import './index.css'

const root = (
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))
