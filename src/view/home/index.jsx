import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {parsePathWithAppPrefix} from 'app/util'
import ListIssue from 'app/view/list_issue'
import {getHomeStatistics} from 'app/action/home'
import {getIssueList} from 'app/action/issue_list'
import {createIssue} from 'app/action/flow'
import {
  TODO_ISSUE,
  DRAFT_ISSUE,
  COMPLETED_ISSUE,
  DEFAULT_ISSUE_LIST_PAGE,
  DEFAULT_ISSUE_LIST_SIZE,
  DEFAULT_ISSUE_LIST_STAT,
} from 'app/common'
import NoData from 'app/components/no_data'

const DEFAULT_FLOW_ID = 200001

class Home extends Component {
  componentDidMount () {
    this.props.getHomeStatistics()
    const query = {
      offset: DEFAULT_ISSUE_LIST_PAGE,
      limit: DEFAULT_ISSUE_LIST_SIZE,
    }
    this.props.getIssueList(DEFAULT_ISSUE_LIST_STAT, query)
  }

  parseTabs = (countList) => {
    return [TODO_ISSUE, DRAFT_ISSUE, COMPLETED_ISSUE].map((tab, idx) => {
      const {stat, name, icon, iconBgColorClass} = tab
      const count = countList[idx]
      const issueListPath = `issue_list/${stat}`
      const iconBgClass = `${iconBgColorClass} fl icon-box`
      const iconClass = `${icon} color-white`
      return (
        <div key={idx} className='dhms-md-8 dhms-xs-24 index-list'>
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
    const {statistics = {}, list = []} = this.props
    const {todo = 0, draft = 0, completed = 0} = statistics
    const countList = [todo, draft, completed]

    return (
      <div className='service-content'>
        <div className='blank20' />
        <div className='clearfix'>
          {this.parseTabs(countList)}
        </div>
        <br />
        <div className='recent-process'>
          <div className='s-h1 font20 color-black'>
            <strong>最近处理</strong>
          </div>
          <div className='blank20' />
          <ul className='process-list'>
            {
              list.length > 0
                ? list.map((issue, idx) => <ListIssue key={idx} issue={issue} />)
                : <NoData />
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {home = {}, issueList = {}} = state
  const {statistics = {}} = home
  const {list = []} = issueList
  return {statistics, list}
}

function mapDispatchToProps (dispatch) {
  return {
    getHomeStatistics: bindActionCreators(getHomeStatistics, dispatch),
    getIssueList: bindActionCreators(getIssueList, dispatch),
    createIssue: bindActionCreators(createIssue, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
