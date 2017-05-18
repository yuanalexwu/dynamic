const express = require('express')
const fs = require('fs')
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
  res.send(fs.readFileSync('step1.json', 'utf-8'))
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
  data = DEVICE_DATA.filter(data => data.id === customerId)
  if (data.length > 0) {
    data = data[0]['data']
  }
  res.json(data)
})

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
