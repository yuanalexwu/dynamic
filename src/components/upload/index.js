import React, { Component } from 'react'
import { Upload as AntUpload, Button, Icon } from 'antd'

class Upload extends Component {
  render () {
    let {
      validateMessage = '验证失败',
      validatePosition = 'right',
      hasError = false,
      wrapperClassName = '',
      className = '',
      onChange,
      action
    } = this.props
    // wrapper class name
    if (hasError) {
      wrapperClassName = `${wrapperClassName} has-error`
    }

    const btnProps = {
      ghost: true,
      size: 'small',
      type: 'primary'
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
        <AntUpload
          className={className}
          onChange={onChange}
          action={action}
        >
          <Button {...btnProps}>
            <Icon type='upload' /> 上传文件
          </Button>
        </AntUpload>
      </div>
    )
  }
}

export default Upload
