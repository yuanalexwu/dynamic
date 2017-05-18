/**
 * Created by sam on 11/04/2017.
 */
import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
// import { Parser } from 'html-to-react'
import Widget from './widget'

class CommonComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reactHtml: '',
      value: ''
    }
  }
  handleClick = (e) => {
    console.log(this.state.value)
  }

  componentDidMount () {
    const reactHtml = ReactDOMServer.renderToString(<Widget />)
    console.log(reactHtml)
    document.getElementById('common-wrapper').innerHTML = reactHtml
  }

  render () {
    return (
      <div id='common-wrapper' />
    )
  }
}

export default CommonComponent
