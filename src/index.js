import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { store } from './store'
import Root from 'app/container/root'
import Login from 'app/view/login'
import {parsePathWithAppPrefix} from 'app/util'

const root = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={parsePathWithAppPrefix('/login')} component={Login} />
        <Route component={Root} />
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))
