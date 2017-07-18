import React, {Component} from 'react'
import './index.css'

class Pagination extends Component {
  handleClick = (page, size, canFetch) => () => {
    if (!canFetch) {
      return false
    }
    this.props.onClick(page, size)
    return false
  }

  parsePreviousLink = (page, size, total) => {
    let className = 'previous_link'
    let canFetch = true
    if (page === 1) {
      className = `${className} disabled`
      canFetch = false
    }
    return <a className={className} onClick={this.handleClick(page - 1, size, canFetch)}>上一页</a>
  }

  parseNextLink = (page, size, total) => {
    const lastPage = Math.ceil(total / size)
    let className = 'next-link'
    let canFetch = true
    if (page >= lastPage) {
      className = `${className} disabled`
      canFetch = false
    }
    return <a className={className} onClick={this.handleClick(page + 1, size, canFetch)}>下一页</a>
  }

  /**
   * page: 5 => 1 x 3 4 5 6 7 8 x 10
   *            --------^-----------
   */
  parseMiddleLink = (page, size, total) => {
    const lastPage = Math.ceil(total / size)
    const pagination = []
    if (lastPage > 10) {
      const renderPrefixGrap = page - 2 > 2
      if (renderPrefixGrap) {
        // first page
        pagination.push(this.parsePageLink(page, size, 1))
        // grap
        pagination.push(<span className='pagination-grap' key='2'>...</span>)
        for (let i = page - 2; i <= page; i++) {
          pagination.push(this.parsePageLink(page, size, i))
        }
      } else {
        for (let i = 1; i <= page; i++) {
          pagination.push(this.parsePageLink(page, size, i))
        }
      }
      const renderPostGrap = page + 2 < lastPage - 1
      if (renderPostGrap) {
        for (let i = page + 1; i <= page + 2; i++) {
          pagination.push(this.parsePageLink(page, size, i))
        }
        // grap
        pagination.push(<span className='pagination-grap' key={`${page + 3}`}>...</span>)
        // last page
        pagination.push(this.parsePageLink(page, size, lastPage))
      } else {
        for (let i = page + 1; i <= lastPage; i++) {
          pagination.push(this.parsePageLink(page, size, i))
        }
      }
      return pagination
    }
    for (let i = 1; i <= lastPage; i++) {
      let className = 'page-link'
      if (page === i) {
        className = `${className} active`
      }
      pagination.push(
        <a
          key={i}
          className={className}
          onClick={this.handleClick(i, size, true)}
        >
          {i}
        </a>
      )
    }
    return pagination
  }

  parsePageLink = (page, size, pageIndex) => {
    let className = 'page-link'
    if (page === pageIndex) {
      className = `${className} active`
    }
    return (
      <a
        key={pageIndex}
        className={className}
        onClick={this.handleClick(pageIndex, size, true)}
      >
        {pageIndex}
      </a>
    )
  }

  render () {
    const {page, size, total, onClick} = this.props // eslint-disable-line
    return (
      <div className='clearfix'>
        <div className='pagination clearfix display-way'>
          {this.parsePreviousLink(page, size, total)}
          {this.parseMiddleLink(page, size, total)}
          {this.parseNextLink(page, size, total)}
        </div>
      </div>
    )
  }
}

export default Pagination
