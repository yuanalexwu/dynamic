export function testApi () {
  return dispatch => {
    fetch('/api/activity').then(rst => { // eslint-disable-line
      console.log(rst)
    }).catch(err => {
      console.log(err)
    })
  }
}
