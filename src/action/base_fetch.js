import {noop, isFunc} from 'app/util'
import {GET, POST} from 'app/common'
import * as ActionType from '../constant'

function baseFetch (option, dispatch) {
  const {
    url,
    data = {},
    success = noop,
    error = noop,
    method = GET
  } = option
  const fetchOption = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (method === POST) {
    fetchOption.body = JSON.stringify(data)
  }

  dispatch({type: ActionType.SHOW_LOADING})

  // eslint-disable-next-line
  fetch(url, fetchOption).then(data => {
    dispatch({type: ActionType.HIDE_LOADING})
    return data.json()
  }).then(res => {
    const {status, msg = '', devmsg = ''} = res
    if (status === 200) {
      if (isFunc(success)) success(res)
    } else {
      if (typeof error === 'function') {
        error(msg)
        console.log(devmsg)
      }
    }
  }).catch(err => {
    dispatch({type: ActionType.HIDE_LOADING})
    const {message = ''} = err
    if (isFunc(error)) error(message)
  })
}

export default baseFetch
