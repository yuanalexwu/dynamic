import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Wrapper from 'app/components/wrapper'
import {getJsonConfig} from 'app/action/common'

class CreateIssue extends Component {
  componentWillMount () {
    this.props.getJsonConfig('1001')
  }

  render () {
    const {jsonConfig} = this.props
    return (
      <div>
        <h2>创建工单</h2>
        <Wrapper jsonConfig={jsonConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {common = {}} = state
  return {
    jsonConfig: common
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getJsonConfig: bindActionCreators(getJsonConfig, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateIssue)
