import React, {Component} from 'react'
import './index.css'

class NoData extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <div className='no-data-wrapper'>无数据</div>
    )
  }
}

export default NoData
