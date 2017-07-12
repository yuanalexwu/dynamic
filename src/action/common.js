import * as ActionType from '../constant'

export function getJsonConfig (configId = '1001') {
  return dispatch => {
    fetch(`/gw/issuecenter/issue/config/${configId}`) // eslint-disable-line
    .then(data => {
      return data.json()
    }).then(config => {
      const action = {
        type: ActionType.GET_JSON_CONFIG_SUCCES,
        config
      }
      dispatch(action)
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
    }).then(rst => {
      console.log('submitData() ', rst)
      // TODO dispatch action
    }).catch(err => {
      console.log(err)
    })
  }
}
