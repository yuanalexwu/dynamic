import React, { Component } from 'react'
import { Select as AntSelect } from 'antd'
const Option = AntSelect.Option

class Select extends Component {
  render () {
    const {
      value, list, placeholder,
      onChange, className, style = {},
      validateMessage, validatePosition = 'right', hasError
    } = this.props
    const innerStyle = {width: '100%', ...style}
    const options = list.map((option, idx) => {
      // option [['1001', '设备1'], '1002', ...]
      let title, value
      if (option instanceof Array) {
        [value, title] = option
      } else {
        title = option
        value = option
      }
      return (
        <Option key={idx} value={value}>
          {title}
        </Option>
      )
    })
    let wrapperClassName = className
    if (hasError) {
      wrapperClassName = `${wrapperClassName} has-error`
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
        <AntSelect
          showSearch
          size='large'
          style={innerStyle}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          filterOption={function (inputValue, option) {
            return option.props.children.indexOf(inputValue.trim()) !== -1
          }}
        >
          {options}
        </AntSelect>
      </div>
    )
  }
}

Select.defaultProps = {
  value: '',
  list: [],
  placeholder: ''
}

export default Select
