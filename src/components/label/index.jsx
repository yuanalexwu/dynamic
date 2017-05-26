import React, { Component } from 'react'

class Label extends Component {
  render () {
    let {
      defaultValue = '',
      className = '',
      title = '',
      style = {},
    } = this.props

    return (
      <div
        className={className}
        title={title}
        style={style}
      >
        {defaultValue}
      </div>
    )
  }
}

export default Label
