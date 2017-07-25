import React, { Component } from 'react'
import {Input as AntInput} from 'antd'

class Input extends Component {
  render () {
    let {
      validateMessage = '格式不正确',
      validatePosition = 'right',
      defaultValue = '',
      value = '',
      placeholder,
      hasError = false,
      wrapperClassName = '',
      title,
      maxLength,
      readOnly = false,
      style,
      onChange,
      disabled
    } = this.props
    // wrapper class name
    if (hasError) {
      wrapperClassName = `${wrapperClassName} has-error`
    }
    // extra props
    const extraProps = {}
    if (maxLength) {
      extraProps.maxLength = maxLength
    }
    if (title) {
      extraProps.title = title
    }
    if (readOnly) {
      extraProps.readOnly = readOnly
    }
    if (style) {
      extraProps.style = style
    }
    style.background = '#ffffff'
    style.border = '1px solid #e2e2e2'
    style.height = '30px'
    if (disabled) {
      style.background = '#f7f7f7'
    }

    let errorClass = 'has-error-word'
    if (validatePosition) {
      errorClass = `${errorClass} ${validatePosition}`
    }

    return (
      <div className={wrapperClassName}>
        <div className={errorClass}>
          {validateMessage}
          <i className='arrow'><i /></i>
        </div>
        <AntInput
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...extraProps}
        />
      </div>
    )
  }
}

export default Input
