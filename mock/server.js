const express = require('express')
const fs = require('fs')
const path = require('path')
const faker = require('faker')
const morgan = require('morgan')
// const bodyParser = require('body-parser')
const app = express()

const PORT = 9999
const API_PREFIX = '/gw'
const USERCENTER_API = `${API_PREFIX}/usercenter`
const ISSUECENTER_API = `${API_PREFIX}/issuecenter`
const DEVICECENTER_API = `${API_PREFIX}/devicecenter`

// parse json data from POST
// app.use(bodyParser.json())
// add middleware for logging
app.use(morgan('combined'))

/**
 * Get config file
 */
app.get(`${ISSUECENTER_API}/issue/config/:configId`, function (req, res) {
  const {configId = ''} = req.params // eslint-disable-line
  res.send(fs.readFileSync('edit_issue.json', 'utf-8'))
})

/**
 * Customer select
 */
app.get(`${USERCENTER_API}/customer/select`, function (req, res) {
  const data = [
    ['1001', '客户1'],
    ['1002', '客户2'],
    ['1003', '客户3']
  ]
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

/**
 * Contact select
 */
const CONTACT_DATA = [
  {id: '1001', data: [['13305498556', '张三']]},
  {id: '1002', data: [['13305498557', '李四']]},
  {id: '1003', data: [['13305498558', '王五']]},
]
app.get(`${USERCENTER_API}/contact/select`, function (req, res) {
  const custId = req.query.custId
  let data
  if (custId) {
    data = CONTACT_DATA.filter(data => data.id === custId)
    data = data ? data[0]['data'] : []
  } else {
    data = CONTACT_DATA.map(function (entry) {
      return entry.data[0]
    })
  }
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

/**
 * Device select
 */
const DEVICE_DATA = [
  {id: '1001', data: [['10001', '设备1']]},
  {id: '1002', data: [['10002', '设备2']]},
  {id: '1003', data: [['10003', '设备3']]},
]
app.get(`${DEVICECENTER_API}/device/select`, function (req, res) {
  const custId = req.query.custId
  let data
  if (custId) {
    data = DEVICE_DATA.filter(data => data.id === custId)
    data = data ? data[0]['data'] : []
  } else {
    data = DEVICE_DATA.map(function (entry) {
      return entry.data[0]
    })
  }
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

/**
 * home
 */
app.get(`${ISSUECENTER_API}/home`, function (req, res) {
  const data = JSON.parse(fs.readFileSync('home.json', 'utf-8'))
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

/**
 * issueList
 */
app.get(`${ISSUECENTER_API}/issue/list`, function (req, res) {
  let {stat = 'all', size = 10, page = 1} = req.query
  size = 1 * size
  page = 1 * page
  size = isNaN(size) ? 10 : size
  page = isNaN(page) ? 10 : page
  const handlingList = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'issue_list/handling.json'), 'utf-8'))
  const unhandlingList = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'issue_list/unhandling.json'), 'utf-8'))
  const finishList = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'issue_list/finish.json'), 'utf-8'))
  let total = 0
  let list = []
  if (stat === 'handling') {
    total = handlingList.length
    list = parseList(handlingList, page, size)
  } else if (stat === 'unhandling') {
    total = unhandlingList.length
    list = parseList(unhandlingList, page, size)
  } else if (stat === 'finish') {
    total = finishList.length
    list = parseList(finishList, page, size)
  } else {
    list = list.concat(handlingList, unhandlingList, finishList)
    total = list.length
    list = parseList(list, page, size)
  }
  const data = {
    total,
    page,
    size,
    list
  }
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

/**
 * Get issue flow list
 */
app.get(`${ISSUECENTER_API}/process/select`, function (req, res) {
  const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'flow_list.json'), 'utf-8'))
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

/**
 * Create Issue
 */
app.get(`${ISSUECENTER_API}/issue/create`, function (req, res) {
  const { pro_uid = ''} = req.query // eslint-disable-line
  const data = {issueId: 10001}
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

function parseList (list, page, size) {
  return list.splice((page - 1) * size, size)
}

/**
 * Upload file
 */
app.post(`/upload`, function (req, res) {
  const data = {status: 'success', id: faker.random.uuid()}
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  })
})

/**
 * Submit user input
 */
app.post(`${ISSUECENTER_API}/issue/save`, function (req, res) {
  res.json({
    status: 200,
    msg: '成功',
    devmsg: '',
  })
})

app.listen(PORT, function () {
  console.log(`Api server is running on ${PORT}`)
})
