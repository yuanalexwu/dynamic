import React from 'react'
import {Link} from 'react-router-dom'
import {parsePathWithAppPrefix} from 'app/util'

const ListIssue = ({issue = {}}) => {
  const {
    issueId, customer, contact,
    tel, device, submitDate,
    handleDate, desc
  } = issue
  return (
    <li className='bg-white color-black font14 clearfix'>
      <button className='button process-button font16'>撤单</button>
      <p className='font16 job-number font16'>
        工单号：{issueId}
        <Link className='modify font14 color-white' to={parsePathWithAppPrefix(`/edit_issue/${issueId}`)}>修改</Link>
      </p>
      <div className='fl label-info'>
        <p><span className='color-super-gray'>客户：</span>{customer}</p>
        <p><span className='color-super-gray'>产品：</span>{device}</p>
      </div>
      <div className='fl label-info'>
        <p><span className='color-super-gray'>联系人：</span>{contact}</p>
        <p><span className='color-super-gray'>电    话：</span>{tel}</p>
      </div>
      <div className='fl label-info'>
        <p><span className='color-super-gray'>提交时间：</span>{submitDate}</p>
        <p><span className='color-super-gray'>处理时间：</span>{handleDate}</p>
      </div>
      <div className='fl label-info'>
        <p><span className='color-super-gray'>文件描述：</span><br />{desc}</p>
      </div>
    </li>
  )
}

export default ListIssue
