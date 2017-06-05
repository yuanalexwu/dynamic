import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {parsePathWithAppPrefix} from 'app/util'
import ListIssue from 'app/view/list_issue'
import {getHomeInfo} from 'app/action/home'
import {createIssue} from 'app/action/flow'
import {
  ALL_ISSUE, HANDLING_ISSUE, UNHANDLING_ISSUE,
  FINISH_ISSUE
} from 'app/common'

const DEFAULT_FLOW_ID = 200001

class Home extends Component {
  componentDidMount () {
    this.props.getHomeInfo()
  }

  parseTabs = (countList) => {
    return [ALL_ISSUE, HANDLING_ISSUE, UNHANDLING_ISSUE, FINISH_ISSUE].map((tab, idx) => {
      const {stat, name, icon, iconBgColorClass} = tab
      const count = countList[idx]
      const issueListPath = `issue_list/${stat}`
      const iconBgClass = `${iconBgColorClass} fl icon-box`
      const iconClass = `${icon} color-white`
      return (
        <div key={idx} className='dhms-md-6 dhms-xs-24 index-list'>
          <Link to={parsePathWithAppPrefix(issueListPath)}>
            <div className='bg-white list-info clearfix'>
              <span className={iconBgClass}>
                <i className={iconClass} />
              </span>
              <div className='list-word fl font16 color-black'>
                {name}
                <br />
                <span className='unmber color-super-gray'>{count}</span>
              </div>
            </div>
          </Link>
        </div>
      )
    })
  }

  handleClick = () => {
    const {history} = this.props
    this.props.createIssue(DEFAULT_FLOW_ID, history)
  }

  render () {
    const {home} = this.props
    const {total = 0, handling = 0, unhandling = 0, finish = 0, list = []} = home
    const countList = [total, handling, unhandling, finish]

    return (
      <div className='service-content'>
        <div className='blank20' />
        <div className='clearfix'>
          {this.parseTabs(countList)}
        </div>
        <div className='row'>
          <div className='blank20' />
          <div className='dhms-xs-24'>
            <div
              className='add-new text-center'
              onClick={this.handleClick}
            >
              <i className='service-list-add color-white' />
              <br />
              <span className='color-white font16'>开工单</span>
            </div>
          </div>
          <div className='blank20' />
        </div>
        <div className='recent-process'>
          <div className='s-h1 font20 color-black'>
            <strong>最近处理</strong>
          </div>
          <div className='blank20' />
          <ul className='process-list'>
            {
              list.length > 0
                ? list.map((issue, idx) => <ListIssue key={idx} issue={issue} />)
                : <div style={{width: '100%', textAlign: 'center'}}>无数据</div>
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {home = {}} = state
  return {home}
}

function mapDispatchToProps (dispatch) {
  return {
    getHomeInfo: bindActionCreators(getHomeInfo, dispatch),
    createIssue: bindActionCreators(createIssue, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
