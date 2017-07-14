import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ListIssue from 'app/view/list_issue'
import {getIssueList} from 'app/action/issue_list'
import {parsePathWithAppPrefix} from 'app/util'
import Pagination from 'app/components/pagination'
import NoData from 'app/components/no_data'
import {
  DEFAULT_ISSUE_LIST_PAGE,
  DEFAULT_ISSUE_LIST_SIZE,
  DEFAULT_ISSUE_LIST_STAT,
  TODO_ISSUE,
  DRAFT_ISSUE,
  COMPLETED_ISSUE
} from 'app/common'

class IssueList extends Component {
  componentDidMount () {
    const {match = {}} = this.props
    const {params = {}} = match
    const {issue_stat = DEFAULT_ISSUE_LIST_STAT} = params
    this.handleload(issue_stat, DEFAULT_ISSUE_LIST_PAGE, DEFAULT_ISSUE_LIST_SIZE)
  }

  componentWillReceiveProps (nextProps, nextStat) {
    const {issue_stat: currentIssueStat} = this.props.match.params
    const {issue_stat: nextIssueStat} = nextProps.match.params
    if (currentIssueStat !== nextIssueStat) {
      this.handleload(nextIssueStat, DEFAULT_ISSUE_LIST_PAGE, DEFAULT_ISSUE_LIST_SIZE)
    }
  }

  handleload = (issue_stat, offset, limit) => {
    const query = {
      offset,
      limit,
    }
    this.props.getIssueList(issue_stat, query)
  }

  parseTab = (issue_stat) => {
    const tabs = [
      DRAFT_ISSUE,
      TODO_ISSUE,
      COMPLETED_ISSUE
    ]
    return <ul className='tab-name font16'>
      {
        tabs.map((tab, idx) => {
          const {stat, name} = tab
          let activeClass = ''
          if (stat === issue_stat) {
            activeClass = 'active'
          }
          return <li key={idx} className={activeClass}>
            <Link to={parsePathWithAppPrefix(`/issue_list/${stat}`)}>{name}</Link>
          </li>
        })
      }
    </ul>
  }

  handlePageChange = (page, size) => {
    const {issue_stat} = this.props.match.params
    this.handleload(issue_stat, page, size)
  }

  render () {
    const {issueList, match} = this.props
    const {issue_stat} = match.params
    const {
      total = 0,
      offset = DEFAULT_ISSUE_LIST_PAGE,
      limit = DEFAULT_ISSUE_LIST_SIZE,
      list = []
    } = issueList

    let renderTableList = list.map((issue, idx) => <ListIssue key={idx} issue={issue} />)
    if (renderTableList.length <= 0) {
      renderTableList = <NoData />
    }

    return (
      <div className='service-content'>
        <div className='blank20' />
        <ul className='tab-name font16'>
          {this.parseTab(issue_stat)}
        </ul>
        <div className='blank20' />
        <ul className='process-list'>
          {renderTableList}
        </ul>
        <Pagination
          page={offset}
          size={limit}
          total={total}
          onClick={this.handlePageChange}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {issueList = {}} = state
  return {issueList}
}

function mapDispatchToProps (dispatch) {
  return {
    getIssueList: bindActionCreators(getIssueList, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(IssueList)
