import React from 'react'
import {parsePathWithAppPrefix} from 'app/util'

const handleClick = (app_uid, history) => () => {
  const path = parsePathWithAppPrefix(`/edit_issue/${app_uid}`)
  history.push(path)
}

const ListIssue = ({issue = {}, history}) => {
  const {
    app_number, app_title, app_created_date,
    app_uid,
  } = issue
  return (
    <li className='bg-white color-black font14 clearfix'>
      <button
        className='button process-button font16'
        onClick={handleClick(app_uid, history)}
      >
        修改
      </button>
      <p className='font16 job-number font16'>
        工单号：{app_number}
      </p>
      <div className='fl label-info'>
        <p><span className='color-super-gray'>工单名称：</span>{app_title}</p>
        <p><span className='color-super-gray'>提交时间：</span>{app_created_date}</p>
      </div>
    </li>
  )
}

export default ListIssue
