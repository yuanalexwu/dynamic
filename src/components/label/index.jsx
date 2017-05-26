import React, { Component } from 'react'

class Label extends Component {
  render () {
    let {
      defaultValue = '',
      wrapperClassName = '',
      title = '',
      style = {},
    } = this.props

    return (
      <div
        className={wrapperClassName}
        title={title}
        style={style}
      >
        {defaultValue}
      </div>
    )
  }
}

export default Label
