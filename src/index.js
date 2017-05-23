import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import { store } from './store'
import Root from 'app/container/root'
import Home from 'app/view/home'
import IssueList from 'app/view/issue_list'
import CreateIssue from 'app/view/create_issue'
import './index.scss'

const root = (
  <Provider store={store}>
    <Root />
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))
