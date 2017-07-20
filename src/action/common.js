import * as ActionType from '../constant'
import baseFetch from 'app/action/base_fetch'
import config from 'app/config'
import {GET, POST, PLATFORM} from 'app/common'
import {
  warnNotification,
  getUserInfo,
  addApiExtraPostInfo,
  parsePathWithAppPrefix,
  isFunc
} from 'app/util'
import {message} from 'antd'

const API_URL = config.getApi()

export function getJsonConfig (app_uid) {
  const userInfo = getUserInfo()
  const {userId} = userInfo
  return dispatch => {
    const url = `${API_URL}/v1/app/${PLATFORM}/${app_uid}/${userId}`
    const option = {
      url,
      method: GET,
      success: res => {
        let {dynaform: config} = res
        config = JSON.parse(config)
        const action = {
          type: ActionType.GET_JSON_CONFIG_SUCCES,
          config
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

export function clearJsonConfig () {
  return dispatch => {
    const action = {
      type: ActionType.CLEAR_JSON_CONFIG_SUCCES
    }
    dispatch(action)
  }
}

export function submitData (data, history, cb) {
  data = addApiExtraPostInfo(data)
  return dispatch => {
    const url = `${API_URL}/v1/app/task/deliver`
    const option = {
      url,
      method: POST,
      data,
      success: res => {
        if (isFunc(cb)) cb()
        message.success('保存成功')
        history.push(parsePathWithAppPrefix('/issue_list'))
      },
      error: description => {
        if (isFunc(cb)) cb()
        warnNotification({description})
      }
    }
    baseFetch(option, dispatch)
  }
}
