import React, { Component } from 'react'
import {DatePicker as AntDatePicker} from 'antd'

class DatePicker extends Component {
  render () {
    let {
      validateMessage = '',
      defaultValue = '',
      hasError = false,
      className = '',
      title,
      maxLength,
      readOnly = false,
      style,
      onChange
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

    return (
      <div className={className}>
        <div className='has-error-word'>
          {validateMessage}
          <i className='arrow'><i /></i>
        </div>
        <AntDatePicker
          defaultValue={defaultValue}
          onChange={onChange}
          {...extraProps}
        />
      </div>
    )
  }
}

export default DatePicker
