import * as ActionType from '../constant'
import {PLATFORM, POST} from 'app/common'
import baseFetch from './base_fetch'
import {
  buildRequestUrl,
  parsePathWithAppPrefix,
  getUserInfo,
  warnNotification,
  addApiExtraPostInfo,
} from 'app/util'

export function getFlowList (userId) {
  return (dispatch) => {
    const userInfo = getUserInfo()
    const {userId = ''} = userInfo
    const url = buildRequestUrl(`/v1/d/workorder/${PLATFORM}/${userId}`)
    const option = {
      url,
      success: res => {
        let {data} = res
        const action = {
          type: ActionType.FLOW_LIST_SUCCESS,
          data
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

export function createIssue (pro_uid, history) {
  return (dispatch) => {
    const url = buildRequestUrl(`/v1/app/create/${pro_uid}`)
    const data = addApiExtraPostInfo()
    const option = {
      url,
      data,
      method: POST,
      success: res => {
        const {app_uid} = res
        history.push(parsePathWithAppPrefix(`/edit_issue/${app_uid}`))
      },
      error: description => {
        warnNotification({description, duration: 0})
      }
    }
    baseFetch(option, dispatch)
  }
}
