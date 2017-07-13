import * as ActionType from '../constant'
import {notification} from 'antd'

export function getJsonConfig (configId = '1001') {
  return dispatch => {
    fetch(`/gw/issuecenter/issue/config/${configId}`) // eslint-disable-line
    .then(data => {
      return data.json()
    }).then(res => {
      const {status, data: config, msg: description = '', devmsg = ''} = res
      if (status === 200) {
        const action = {
          type: ActionType.GET_JSON_CONFIG_SUCCES,
          config
        }
        dispatch(action)
      } else {
        notification.warning({message: '出现问题', description})
        console.log(devmsg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

export function submitData (data) {
  return dispatch => {
    fetch(`/gw/issuecenter/issue/save`, { // eslint-disable-line
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(data => {
      return data.json()
    }).then(res => {
      const {status, msg: description = '', devmsg = ''} = res
      if (status === 200) {
        // TODO navigate to another page
        console.log('submitData() ', description)
      } else {
        notification.warning({message: '出现问题', description})
        console.log(devmsg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
