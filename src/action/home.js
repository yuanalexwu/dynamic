import * as ActionType from '../constant'
import baseFetch from 'app/action/base_fetch'
import config from 'app/config'
import {
  warnNotification,
  getUserInfo,
} from 'app/util'

const API_URL = config.getApi()

export function getHomeStatistics () {
  const userInfo = getUserInfo()
  const {userId} = userInfo
  return dispatch => {
    const url = `${API_URL}/v1/app/statistics/${userId}`
    const option = {
      url,
      success: res => {
        const {data = {}} = res
        let {
          draft = 0,
          todo = 0,
          completed = 0,
        } = data
        const action = {
          type: ActionType.HOME_STATISTICS_SUCCESS,
          statistics: {
            draft, todo, completed
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
