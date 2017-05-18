import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Wrapper from './components/wrapper'
import * as commonAction from './action/common'

class App extends Component {
  componentWillMount () {
    this.props.getJsonConfig('1001')
  }

  render () {
    const {jsonConfig} = this.props
    return <Wrapper jsonConfig={jsonConfig} />
  }
}

function mapStateToProps (state) {
  const {common = []} = state
  return {
    jsonConfig: common
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getJsonConfig: bindActionCreators(commonAction.getJsonConfig, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
