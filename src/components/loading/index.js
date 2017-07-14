import React, {Component} from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import './index.css'

class Loading extends Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.show !== this.props.show
  }

  render () {
    const svgClass = cn('loading-wrapper', {'show': this.props.show})
    return (
      <svg
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='40px'
        height='40px'
        viewBox='0 0 50 50'
        xmlSpace='preserve'
        className={svgClass}
      >
        <path
          fill='blue'
          d='M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z'
        >
          <animateTransform
            attributeType='xml'
            attributeName='transform'
            type='rotate'
            from='0 25 25'
            to='360 25 25'
            dur='0.6s'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    )
  }
}

function mapStateToProps (state) {
  const {base: show = false} = state
  return {show}
}

function mapDispatchToProps (dispatch) {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Loading)
