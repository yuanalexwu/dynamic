import React, {Component} from 'react'
import userImg from 'public/img/user-img.jpg'
import {getUserInfo, parsePathWithAppPrefix, logout} from 'app/util'
import {Redirect, withRouter} from 'react-router-dom'

class UserBar extends Component {
  handleLogout = () => {
    logout(this.props.history)
    return false
  }

  render () {
    const userInfo = getUserInfo()
    const {name = ''} = userInfo
    if (!name) {
      return <Redirect to={parsePathWithAppPrefix('/login')}>登陆</Redirect>
    }
    return (
      <span>
        <div className='sign-out fr'><a onClick={this.handleLogout}><i className='service-quit fl' />退出</a></div>
        <div className='user-info fr color-black'>
          <img className='fl' src={userImg} />
          {name}
        </div>
      </span>
    )
  }
}

export default withRouter(UserBar)
