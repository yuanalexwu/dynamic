import React from 'react'

const ListIssue = ({issue = {}}) => {
  const {
    app_number, app_title, app_created_date,
  } = issue
  return (
    <li className='bg-white color-black font14 clearfix'>
      <button className='button process-button font16'>撤单</button>
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
