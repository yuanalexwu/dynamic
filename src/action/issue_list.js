import * as ActionType from '../constant'
import {
  PLATFORM,
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
        // TODO Here we only got data with list, we need more infoes about pagination
        const {data = []} = res
        const action = {
          type: ActionType.ISSUE_LIST_SUCCESS,
          data: {
            list: data
          }
        }
        dispatch(action)
      },
      error: description => {
        warnNotification({description, duration: 0})
      }
    }
    baseFetch(option, dispatch)
  }
}
