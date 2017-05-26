import React, {Component} from 'react'
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class CreateIssue extends Component {
  componentWillMount () {
  }

  render () {
    return (
      <div>
        <h2>创建工单</h2>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateIssue)
