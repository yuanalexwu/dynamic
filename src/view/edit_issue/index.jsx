import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Wrapper from 'app/components/wrapper'
import {getJsonConfig} from 'app/action/common'

class EditIssue extends Component {
  componentWillMount () {
    const {match = {}} = this.props
    const {params = {}} = match
    const {issue_id} = params
    this.props.getJsonConfig(issue_id)
  }

  render () {
    const {jsonConfig} = this.props
    return (
      <div>
        <h3>填写工单信息</h3>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditIssue)
