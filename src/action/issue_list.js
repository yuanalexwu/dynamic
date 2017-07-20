import * as ActionType from '../constant'
import {
  PLATFORM,
  DEFAULT_ISSUE_LIST_PAGE,
  DEFAULT_ISSUE_LIST_SIZE,
} from 'app/common'
import baseFetch from './base_fetch'
import {
  buildRequestUrl,
  getUserInfo,
  warnNotification,
} from 'app/util'

export function getIssueList (issue_stat, query) {
  return (dispatch) => {
    const userInfo = getUserInfo()
    const {userId = ''} = userInfo
    const url = buildRequestUrl(`/v1/workorder/${PLATFORM}/${userId}/${issue_stat}`, query)
    const option = {
      url,
      success: res => {
        let {total, limit, offset, data = []} = res
        total = parseInt(total) || 0
        limit = parseInt(limit) || DEFAULT_ISSUE_LIST_SIZE
        offset = parseInt(offset) || DEFAULT_ISSUE_LIST_PAGE
        const action = {
          type: ActionType.ISSUE_LIST_SUCCESS,
          data: {
            total,
            limit,
            offset,
            list: data
          }
        }
        dispatch(action)
      },
      error: description => {
        warnNotification({description})
      }
    }
    baseFetch(option, dispatch)
  }
}
