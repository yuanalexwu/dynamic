import React, { Component } from 'react'

class TextArea extends Component {
  render () {
    let {
      validateMessage = '格式不正确',
      validatePosition = 'right',
      defaultValue = '',
      placeholder,
      hasError = false,
      className = '',
      title,
      maxLength,
      readOnly = false,
      style,
      onChange,
      disabled
    } = this.props
    // wrapper class name
    if (hasError) {
      className = `${className} has-error`
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
    style.padding = '0px 7px'
    style.borderRadius = '4px'
    if (disabled) {
      style.color = 'rgba(0, 0, 0, 0.25)'
      style.background = '#f7f7f7'
    }

    let errorClass = 'has-error-word'
    if (validatePosition) {
      errorClass = `${errorClass} ${validatePosition}`
    }

    return (
      <div className={className}>
        <div className={errorClass}>
          {validateMessage}
          <i className='arrow'><i /></i>
        </div>
        <textarea
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          {...extraProps}
        />
      </div>
    )
  }
}

export default TextArea
