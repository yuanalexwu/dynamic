import React, { Component } from 'react'

class TextArea extends Component {
  render () {
    let {
      validateMessage = '格式不正确',
      defaultValue = '',
      placeholder,
      hasError = false,
      wrapperClassName = '',
      title,
      maxLength,
      readOnly = false,
      style,
      onChange
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

    return (
      <div className={wrapperClassName}>
        <div className='has-error-word'>
          {validateMessage}
          <i className='arrow'><i /></i>
        </div>
        <textarea
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
