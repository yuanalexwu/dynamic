const express = require('express')
const fs = require('fs')
const path = require('path')
const faker = require('faker')
const morgan = require('morgan')
const app = express()
const PORT = 9999
const API_PREFIX = '/api'

// add middleware for logging
app.use(morgan('combined'))

/**
 * Get config file
 */
app.get(`${API_PREFIX}/config/:configId`, function (req, res) {
  const {configId = ''} = req.params // eslint-disable-line
  res.send(fs.readFileSync('edit_issue.json', 'utf-8'))
})

/**
 * Contact select
 */
app.get(`${API_PREFIX}/contact`, function (req, res) {
  const data = [
    ['13305498556', '张三'],
    ['13305498557', '李四'],
    ['13305498558', '王五'],
  ]
  res.json(data)
})

/**
 * Customer select
 */
app.get(`${API_PREFIX}/customer`, function (req, res) {
  const data = [
    ['1001', '客户1'],
    ['1002', '客户2'],
    ['1003', '客户3']
  ]
  res.json(data)
})

/**
 * Device select
 */
const DEVICE_DATA = [
  {id: '1001', data: [['10001', '设备1']]},
  {id: '1002', data: [['10002', '设备2']]},
  {id: '1003', data: [['10003', '设备3']]},
]
app.get(`${API_PREFIX}/device/:customerId`, function (req, res) {
  const customerId = req.params.customerId
  let data = DEVICE_DATA.filter(data => data.id === customerId)
  if (data.length > 0) {
    data = data[0]['data']
  }
  res.json(data)
})

/**
 * home
 */
app.get(`${API_PREFIX}/home/info`, function (req, res) {
  res.send(fs.readFileSync('home.json', 'utf-8'))
})

/**
 * issueList
 */
app.get(`${API_PREFIX}/issue_list`, function (req, res) {
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
  const issueListInfo = {
    total,
    page,
    size,
    list
  }
  res.send(issueListInfo)
})

/**
 * Get issue flow list
 */
app.get(`${API_PREFIX}/flow_list`, function (req, res) {
  const flowList = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'flow_list.json'), 'utf-8'))
  res.json(flowList)
})

/**
 * Create Issue
 */
app.get(`${API_PREFIX}/create_issue/:flowId`, function (req, res) {
  const { flowId = ''} = req.params // eslint-disable-line
  const data = {issueId: 10001}
  res.json(data)
})

function parseList (list, page, size) {
  return list.splice((page - 1) * size, size)
}

/**
 * Issue type select
 */
app.get(`${API_PREFIX}/issue_type`, function (req, res) {
  const data = [
    ['10001', '故障报修'],
    ['10002', '安装调试']
  ]
  res.json(data)
})

/**
 * Upload file
 */
app.post(`${API_PREFIX}/upload`, function (req, res) {
  const data = {status: 'success', id: faker.random.uuid()}
  res.json(data)
})

/**
 * Submit user input
 */
app.post(`${API_PREFIX}/submit`, function (req, res) {
  res.json({status: 'success'})
})

app.listen(PORT, function () {
  console.log(`Api server is running on ${PORT}`)
})
