import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getFlowList, createIssue} from 'app/action/flow'
import {getUserInfo} from 'app/util'
import './index.css'

class CreateIssue extends Component {
  componentWillMount () {
    const user = getUserInfo()
    const {userId} = user
    this.props.getFlowList(userId)
  }

  handleClick = (flowId) => () => {
    const {history} = this.props
    this.props.createIssue(flowId, history)
  }

  render () {
    const {flowList} = this.props
    let renderFlowList = flowList.map((flow, idx) => {
      const {pro_uid: flowId, pro_title: name} = flow
      return (
        <div
          key={idx}
          className='add-new text-center flow-item'
          onClick={this.handleClick(flowId)}
        >
          <i className='service-list-add color-white' />
          <br />
          <span className='color-white font16'>{name}</span>
        </div>
      )
    })
    if (renderFlowList.length === 0) {
      renderFlowList = <div style={{width: '100%', textAlign: 'center', fontSize: '2em'}}>无数据</div>
    }
    return (
      <div>
        <h3>请选择流程</h3>
        <div className='flow-content'>
          {renderFlowList}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {flow = {}} = state
  const {flowList = []} = flow
  return {
    flowList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getFlowList: bindActionCreators(getFlowList, dispatch),
    createIssue: bindActionCreators(createIssue, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateIssue)
