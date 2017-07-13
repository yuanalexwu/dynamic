import * as ActionType from '../constant'
import {buildRequestUrl} from '../util'
import {notification} from 'antd'

export function getCustomerSelect () {
  return (dispatch) => {
    const path = buildRequestUrl('/gw/usercenter/customer/select')
    fetch(path).then(data => { // eslint-disable-line
      return data.json()
    }).then(res => {
      const {status, data, msg: description = '', devmsg = ''} = res
      if (status === 200) {
        const action = {
          type: ActionType.CUSTOMER_SELECT_SUCCES,
          data
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
