/**
 * Created by sam on 11/04/2017.
 */
import React, { Component } from 'react'
import { Input, Button } from 'antd'
import './widget.scss'

class Widget extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleClick = (e) => {
    console.log('adsfads', this.state.value)
  }

  render () {
    console.log('Widget render()')
    return (
      <div>
        <div>
          <Input
            onChange={(e) => {
              console.log(e.target.value)
              this.setState({value: e.target.value})
            }}
            value={this.state.value}
            placeholder='输入参数'
            className='col-md-6'
          />
        </div>
        <div>
          <Button onClick={this.handleClick}>click me</Button>
        </div>
      </div>
    )
  }
}

export default Widget
