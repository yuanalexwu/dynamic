import React, {Component, createElement} from 'react'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import * as customerAction from '../../action/customer'
import * as deviceAction from '../../action/device'
import * as commonAction from '../../action/common'
import * as issueAction from '../../action/issue'
import * as contactActionn from '../../action/contact'
import moment from 'moment'
import {connect} from 'react-redux'
import Select from '../select'
import Input from '../input'
import DatePicker from '../datepicker'
import {Button} from 'antd'
import TextArea from '../textarea'
import Upload from '../upload'
import Label from '../label'
import {mergeOption} from './common'

/**
 * Convert seconds to microseconds
 */
const TIME_RATE = 1000
/**
 * Common Invalid message
 */
const DEFAULT_INVALID_MESSAGE = '格式错误' // eslint-disable-line
/**
 * Types that does not need to created by React.createElement()
 * just return itself
 */
const STRAIGHT_RENDER_TYPE_LIST = ['string', 'number']
/**
 * Types of element
 */
const SELECT_ELEMENT_TYPE = 'select'
const INPUT_ELEMENT_TYPE = 'input'
const LABEL_ELEMENT_TYPE = 'label'
const DATE_ELEMENT_TYPE = 'date'
const HIDDEN_ELEMENT_TYPE = 'hidden'
const ICON_ELEMENT_TYPE = 'i'
const BUTTON_ELEMENT_TYPE = 'button'
const TEXTAREA_ELEMENT_TYPE = 'textarea'
const UPLOAD_ELEMENT_TYPE = 'upload'
/**
 * Size type
 */
const CLASS_TYPE_XS = 'xs'
const CLASS_TYPE_SM = 'sm'
const CLASS_TYPE_MD = 'md'
const CLASS_TYPE_LG = 'lg'
/**
 * select name which can load data from server
 */
const WORKORDER_TYPE_SELECT_NAME = 'workorder_type'
const CUSTOMER_SELECT_NAME = 'customer'
const DEVICE_SELECT_NAME = 'device'
const ISSUE_TYPE_SELECT_NAME = 'issue_type'
const CONTACT_SELECT_NAME = 'contact'
// Hold the total select name
const SELECT_NAME_LIST = [
  WORKORDER_TYPE_SELECT_NAME,
  CUSTOMER_SELECT_NAME,
  DEVICE_SELECT_NAME,
  ISSUE_TYPE_SELECT_NAME,
  CONTACT_SELECT_NAME
]
// Select key and label delimter
const SELECT_SUBMIT_DELIM = '__|__'

class Wrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.FETCH_MAP = {
      [CUSTOMER_SELECT_NAME]: this.props.getCustomerList,
      [DEVICE_SELECT_NAME]: this.props.getDeviceSelectByCustomer,
      [ISSUE_TYPE_SELECT_NAME]: this.props.getIssueTypeSelect,
      [CONTACT_SELECT_NAME]: this.props.getContactSelect,
    }

    /**
     * store the `hidden` element that will be submitted to
     * the server
     */
    this.hidden = {}

    /**
     * Store the error message for each state key, if it's necessary to validate
     * the state
     */
    this.error = {}

    /**
     * Store the validation object for each state key.We check if when submission happens
     */
    this.valid = {}

    /**
     * Read json config once, then mark it `true` if it has read.
     * Prevent extra parse for the config, we only need to parse
     * only once
     */
    this.isConfigRead = false
    /**
     * Hold the json config
     */
    this.jsonConfig = []
  }

  componentWillReceiveProps (nextProps) {
    let {
      jsonConfig = {}, customerSelect, deviceSelect,
      issueTypeSelect, contactSelect
    } = nextProps
    const {table = []} = jsonConfig
    // 1. get raw configuration from server
    if (table.length > 0 && !this.isConfigRead) {
      console.log('componentWillReceiveProps() ', jsonConfig)
      this.initConfig(jsonConfig)
    }

    /**
     * Set select data
     */
    if (customerSelect.length > 0) {
      customerSelect = this.parseOptionWithDefaultValue(customerSelect, CUSTOMER_SELECT_NAME)
      this[`${CUSTOMER_SELECT_NAME}_list`] = customerSelect
    }
    if (deviceSelect.length > 0) {
      deviceSelect = this.parseOptionWithDefaultValue(deviceSelect, DEVICE_SELECT_NAME)
      this[`${DEVICE_SELECT_NAME}_list`] = deviceSelect
    }
    if (issueTypeSelect.length > 0) {
      issueTypeSelect = this.parseOptionWithDefaultValue(issueTypeSelect, ISSUE_TYPE_SELECT_NAME)
      this[`${ISSUE_TYPE_SELECT_NAME}_list`] = issueTypeSelect
    }
    if (contactSelect.length > 0) {
      contactSelect = this.parseOptionWithDefaultValue(contactSelect, CONTACT_SELECT_NAME)
      this[`${CONTACT_SELECT_NAME}_list`] = contactSelect
    }
  }

  initConfig = (jsonConfig) => {
    // 2. parse raw configuration
    const {state, error, valid, requests = [], config} = this.prepareConfig(jsonConfig)

    /**
     * Fetch all the data that will be used in the further
     */
    requests.map(req => req())
    /**
     * Store the parsed configuration that will render and rerender as necessary
     */
    this.renderConfig = config
    this.error = error
    this.valid = valid
    /**
     * First store the element's state value in parent, then we can
     * create the element referred to the parent state
     */
    this.setState({...this.state, ...state})
    this.isConfigRead = true
  }

  /**
   * Prepare configuration to renderable configuration for the further use
   * the state that will submit to server
   * the error for state
   * the valid for state
   * the requests that will fetch from server
   *
   * @param {object}rawConfig Raw configuration from server
   * @returns {object}
   *  {object}state,
   *  {object}error,
   *  {object}valid,
   *  {array}requests,
   *  {object}config
   */
  prepareConfig = (rawConfig = {}) => {
    /**
     * hold the state for element which will be maintained
     */
    const state = {}
    /**
     * hold the error for state, that will be shown if it's not valid
     */
    const error = {}
    /**
     * hold the valid object for state, that will be checked when submission
     */
    const valid = {}
    /**
     * hold the event that will be called later
     */
    const requests = []

    const {border = true, className = [], style = {}, table = []} = rawConfig
    if (!(table instanceof Array) || table.length === 0) {
      // no data
      return []
    }
    const wrapperTableConfig = this.getWrapperTableConfig(border, className, style)
    for (const [rowIndex, row] of table.entries()) {
      const wrapperRowConfig = this.getWrapperRowConfig(rowIndex)
      for (const [cellIndex, cell] of row.entries()) {
        cell.key = cellIndex
        this.prepareInitData([cell], state, error, valid, requests)
        wrapperRowConfig.children.push(cell)
      }
      wrapperTableConfig.children.push(wrapperRowConfig)
    }
    return {state, error, valid, requests, config: wrapperTableConfig}
  }

  getWrapperTableConfig = (border, className = [], style) => {
    let tableClass = 'div-table clearfix'
    if (!border) {
      tableClass = `${tableClass} no-div-table`
    }
    if (className.length > 0) {
      // The first element of `className` is manual className
      // see the defination in `api/api.md`
      const manualClass = className[0]
      if (manualClass) {
        tableClass = `${tableClass} ${manualClass}`
      }
    }
    className[0] = tableClass
    return {
      type: 'div',
      className,
      style,
      children: []
    }
  }

  getWrapperRowConfig = (rowIndex) => {
    return {
      type: 'div',
      key: rowIndex,
      className: ['div-table-tr'],
      children: []
    }
  }

  /**
   * Parse element's state, error, valid, requests
   *
   * @param children
   * @param state Hold the reference of the state, we will change it later
   * @param error Hold the reference of the error, we will change it later
   * @param valid Hold the reference of the valid, we will change it later
   * @param requests Hold the reference of the requests, we will change it later
   */
  prepareInitData = (children, state, error, valid, requests) => {
    for (const child of children) {
      const {
        type, name, defaultValue,
        children: subChildren, validate,
        option, target, source
      } = child
      if (name) {
        /**
         * We only setup `error`, `valid`, `state` and `requests`
         * for element which has name
         */
        error[name] = ''
        if (validate) {
          valid[name] = validate
        }
        if (type === DATE_ELEMENT_TYPE) {
          state[name] = moment(defaultValue * TIME_RATE)
        } else if (type === UPLOAD_ELEMENT_TYPE) {
          state[name] = []
        } else if (type === SELECT_ELEMENT_TYPE && !source) {
          const hasDefaultOptionValue = typeof defaultValue === 'array'
          if (hasDefaultOptionValue) {
            const [key = '', label = ''] = defaultValue
            state[name] = {key, label}
          } else {
            state[name] = {key: '', label: '请选择'}
          }
          /**
           * `source` means this select data will be set according
           * to other `select`
           */
          if (option instanceof Array) {
            let newOption = option.slice()
            // set select default data
            if (hasDefaultOptionValue) {
              newOption = mergeOption(newOption, defaultValue)
            }
            this[`${name}_list`] = newOption
          } else {
            if (hasDefaultOptionValue) {
              this[`${name}_default_option`] = defaultValue
            }
            // get select data from server
            requests.push(() => {
              this.FETCH_MAP[name]()
            })
          }

          // TODO here we get a problem that we don't know whether the
          // target select option will fetch from server or set from configuration
          if (typeof target === 'array') {
            let value = defaultValue
            if (hasDefaultOptionValue) {
              value = defaultValue[0]
            }
            target.map((targetName) => {
              requests.push(() => {
                this.FETCH_MAP[targetName](value)
              })
            })
          }
        } else {
          state[name] = defaultValue
        }
      }
      if (subChildren instanceof Array) {
        // parse child's children
        this.prepareInitData(subChildren, state, error, valid, requests)
      }
    }
  }

  /**
   * Render component by the parsed configuration
   *
   * @param {object} option {
   *  {string} type: 'div',
   *  {string|undefined} name: key name for submit
   *  {string} key: React component key
   *  {string} defaultValue: Default react component value
   *  {string} title: Tooltips for element
   *  {number} maxLength: Max length for element like `input`
   *  {Boolean} readOnly: Readonly for element like `input`
   *  {string} placeholder: Placeholder for element like `input`
   *  {object} style: Inline style for element, for the convince of changing the style
   *  {array[object]|string|null} children: [option] array of child component option
   *  {array} className: [
   *    {string}: 'text-center font30 color-green clearfix' Default class specified
   *      to this element
   *    {object} : {
   *      {number} xs|sm|md|lg: 12 Component width use dhms 24 grid system `dhms-[xs|sm|md|lg]-12`
   *        all the element can only use this to specify the width
   *      {number} offset: 6 Component margin before `dhms-offset-[xs|sm|md|lg]-6`
   *    }
   *  ]
   * {object} action: { Both `button` and `upload` have this property
   *    {string} type: 'submit' Action type
   *    {string} handler: '/api/upload' Request prefix to the server
   * }
   * }
   *
   * @returns {Element} Element that created by React.createElement
   */
  renderElement = (option = {}) => {
    const {type, children = null} = option
    if (!type) {
      return null
    }
    /**
     * generate props
     */
    const props = this.generateProps(option)

    /**
     * hold the next depth child react element
     */
    const parsedChildren = []
    if (children instanceof Array) {
      for (const [index, child] of children.entries()) {
        const childType = typeof child
        if (STRAIGHT_RENDER_TYPE_LIST.indexOf(childType) !== -1 || !child) {
          parsedChildren.push(child)
        } else {
          child.key = index
          const elem = this.renderElement(child)
          parsedChildren.push(elem)
        }
      }
    }
    if (parsedChildren.length > 0) {
      return this.doCreate(type, props, parsedChildren)
    } else {
      return this.doCreate(type, props)
    }
  }

  /**
   * Generate component props from option
   * @param option The component configuration
   * @returns {object}
   */
  generateProps = (option) => {
    const {
      type, key, name = '',
      defaultValue = '', title, maxLength,
      placeholder, style = {}, readOnly,
      validateMessage, className: classNameList = [], validatePosition
    } = option
    /**
     * Hold all the props of component
     */
    let props = {}

    const className = this.generateClassName(classNameList)
    if (className) {
      props.className = className
    }
    /**
     * If name is exists, we should add value, event handler and hasError for it
     */
    if (name) {
      props.name = name
      // value Refer element value to parent state
      props.value = this.state[name]
      // hasError Component with invalid user input will be set to true
      if (this.error[name]) {
        props.hasError = true
      }
      // bind onChange event for the element
      this.bindEventOnProps(props, option)
    }
    if (key) {
      props.key = key
    }
    if (readOnly) {
      props.readOnly = readOnly
    }
    if (title) {
      props.title = title
    }
    if (maxLength) {
      props.maxLength = maxLength
    }
    if (placeholder) {
      props.placeholder = placeholder
    }
    if (style) {
      props.style = style
    }
    if (defaultValue) {
      /**
       * parse the unix timestamp to `Date` timestamp.
       * we use antd DatePicker which is using momentjs
       */
      if (type === DATE_ELEMENT_TYPE) {
        props.defaultValue = moment(defaultValue * TIME_RATE)
      } else {
        props.defaultValue = defaultValue
      }
    }
    if (validateMessage) {
      props.validateMessage = validateMessage
    }
    if (validatePosition) {
      props.validatePosition = validatePosition
    }

    /**
     * deal with some particular types' props
     */
    if (type === SELECT_ELEMENT_TYPE) {
      props.list = this[`${name}_list`]
    }
    if (type === BUTTON_ELEMENT_TYPE) {
      // default button type
      props.size = 'large'
      props.type = 'primary'
      /**
       * Bind event for button, cause it doesn't have `name`
       */
      this.bindEventOnProps(props, option)
    }
    if (type === UPLOAD_ELEMENT_TYPE) {
      const {action} = option
      const {handler} = action
      props.action = handler
      props.fileList = this.state[name]
    }
    return props
  }

  /**
   * Generate className for component
   * @param {Array} classNameList Contains default class name as it's first element
   * and other grid layout object.
   * [
   *  'default_class_name',
   *  {sm: 3, offset: 4},
   *  {lg: 4, offset: 3}
   * ]
   * @returns {string}className 'dhms-xs-12 dhms-lg-10'
   */
  generateClassName = (classNameList) => {
    // class name
    let defaultClass = ''
    let classNameXs = []
    let classNameSm = []
    let classNameMd = []
    let classNameLg = []
    for (const classElem of classNameList) {
      const typeOfClass = typeof classElem
      if (typeOfClass === 'string') {
        defaultClass = classElem
        continue
      }
      if (typeOfClass === 'object') {
        const {xs, sm, md, lg, offset} = classElem
        if (xs) {
          classNameXs = this.getClassName(CLASS_TYPE_XS, {width: xs, offset})
        } else if (sm) {
          classNameSm = this.getClassName(CLASS_TYPE_SM, {width: sm, offset})
        } else if (md) {
          classNameMd = this.getClassName(CLASS_TYPE_MD, {width: md, offset})
        } else if (lg) {
          classNameLg = this.getClassName(CLASS_TYPE_LG, {width: lg, offset})
        }
      }
    }
    return [
      ...classNameXs,
      ...classNameSm,
      ...classNameMd,
      ...classNameLg,
      defaultClass
    ].filter(c => c).join(' ')
  }

  /**
   * Parse class for each size(xs|sm|md|lg)
   * @param {string}type xs|sm|md|lg
   * @param {object} sizeObj {width: 6, number: 6}
   *
   * @returns {Array} List of className
   */
  getClassName = (type, sizeObj) => {
    let {width, offset} = sizeObj
    width = width ? `dhms-${type}-${width}` : ''
    offset = offset ? `dhms-${type}-offset-${offset}` : ''
    return [offset, width]
  }

  /** Bind onChange, onClick event on props
   *
   * @param {object}props The specified props that will be bind event on it
   * @param {object}option The configuration option of element
   */
  bindEventOnProps = (props, option) => {
    const {type, name, target = [], sync} = option
    switch (type) {
      case SELECT_ELEMENT_TYPE: {
        if (target.length > 0) {
          const {FETCH_MAP} = this
          props.onChange = this.handleAntSelectChange(name, value => {
            // value: Will passed from the onChange `event.target.value`
            // if it's connected to another select, and we will set it to default
            // and then fetch new data for the connected select
            target.map(targetName => {
              this[`${targetName}_list`] = []
              this.setState({
                [targetName]: ''
              })
              // TODO Maybe we do not need to fetch new data from server
              if (FETCH_MAP.hasOwnProperty(targetName)) {
                FETCH_MAP[targetName](value)
              }
            })
          })
        } else {
          props.onChange = this.handleAntSelectChange(name, value => {
            if (sync && value) {
              const {key = ''} = value
              this.setState({[sync]: key}, () => {
                this.getValidData()
              })
            }
          })
        }
        break
      }
      case DATE_ELEMENT_TYPE: {
        props.onChange = this.handleDateChange(name)
        break
      }
      case BUTTON_ELEMENT_TYPE: {
        const {action} = option
        const {type, handler} = action
        if (type === 'submit') {
          props.onClick = this.handleSubmit(handler)
        }
        break
      }
      case UPLOAD_ELEMENT_TYPE: {
        props.onChange = this.handleUpload(name)
        break
      }
      default: {
        props.onChange = this.handleElementChange(name)
      }
    }
  }

  /**
   * handle element change event
   * @param {string}key Stored key of the element value in parent state
   * @returns {Function} Function which will apply to the `onChange` event
   */
  handleElementChange = key => e => {
    const {value} = e.target
    this.setState({[key]: value}, () => {
      this.getValidData()
    })
  }

  /**
   * handle change event for antd select
   * @param {string}key Stored key of the element value in parent state
   * @param {Function|undefined}cb Callback will be called with the changed value
   */
  handleAntSelectChange = (key, cb) => value => {
    console.log('handleAntSelectChange() ', value)
    this.setState({[key]: value || ''}, () => {
      this.getValidData()
      if (typeof cb === 'function') {
        cb(value)
      }
    })
  }

  handleDateChange = key => (date, datestring) => {
    this.setState({[key]: date}, () => {
      this.getValidData()
    })
  }

  /**
   * submit to server
   */
  handleSubmit = () => {
    let form_data = this.getValidData()
    if (!form_data) {
      return
    }
    const {match = {}} = this.props
    const { params = {} } = match
    const {issue_id: app_uid = ''} = params
    // form_data = JSON.stringify(form_data)
    const data = {
      app_uid,
      form_data,
    }
    console.log(data)
    // const {history} = this.props
    // this.props.submitData(data, history)
  }

  /**
   * handle upload files
   */
  handleUpload = name => info => {
    let {fileList = []} = info // eslint-disable-line
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success'
      }
      return true
    })
    this.setState({[name]: fileList}, () => {
      this.getValidData()
    })
  }

  /**
   * Check the submission is valid
   * all the validation is stored in `valid`
   * return the data if valid
   *
   * @returns {object|undefined}
   */
  getValidData = () => {
    let ret = true
    const data = this.getData()
    const {valid, error} = this
    for (const key of Object.keys(valid)) {
      const validate = valid[key] || {}
      let {reg, maxLength, required} = validate
      let value = data[key]
      if (SELECT_NAME_LIST.indexOf(key) !== -1) {
        // Select's value is {key: '1001', label: 'xxx'}
        // We only check the `key`
        const {key: id = '', label = ''} = value
        value = id
        // Update select value for submittion
        data[key] = [id, label].join(SELECT_SUBMIT_DELIM)
      }
      let hasError = false
      if (reg) {
        reg = new RegExp(reg)
        if (!reg.test(value)) {
          hasError = true
        }
      }
      if (maxLength) {
        value = `${value}`
        if (value.length > maxLength) {
          hasError = true
        }
      }
      if (required) {
        if (!value) {
          hasError = true
        }
        if (value instanceof Array && value.length === 0) {
          hasError = true
        }
      }
      error[key] = hasError
      if (hasError) {
        ret = false
      }
    }
    this.forceUpdate()
    if (ret) {
      return data
    }
  }
  /**
   * get the object that will submitted to the server
   * @returns {object}
   */
  getData = () => {
    const data = {}
    // moment type
    const momentType = Object.getPrototypeOf(moment()).constructor
    const {state, hidden} = this
    for (const key of Object.keys(state)) {
      let value = state[key]
      if (value && Object.getPrototypeOf(value).constructor === momentType) {
        value = value.unix()
      }
      /**
       * The uploaded file must named `files`
       */
      if (key === 'files') {
        value = value.map(v => {
          // TODO maybe the response data will be changed
          if (v.response && v.response.status === 'success') {
            return v.response.id
          }
          return undefined
        }).filter(v => v)
      }
      data[key] = value
    }
    return {...data, ...hidden}
  }

  /**
   * create react element according particular parameters
   *
   * @param type
   * @param props
   * @param children
   * @returns {Element}
   */
  doCreate = (type, props, children) => {
    switch (type) {
      case LABEL_ELEMENT_TYPE: {
        return createElement(Label, props)
      }
      case INPUT_ELEMENT_TYPE: {
        const {className, ...newProps} = props
        if (className) {
          newProps.wrapperClassName = className
        }
        return createElement(Input, newProps)
      }
      case SELECT_ELEMENT_TYPE: {
        return createElement(Select, props)
      }
      case HIDDEN_ELEMENT_TYPE: {
        // hidden element will be submitted
        const {name, defaultValue} = props
        this.hidden[name] = defaultValue
        return null
      }
      case DATE_ELEMENT_TYPE: {
        return createElement(DatePicker, props)
      }
      case ICON_ELEMENT_TYPE: {
        return createElement(type, props, children)
      }
      case BUTTON_ELEMENT_TYPE: {
        const {defaultValue, ...restProps} = props
        return createElement(Button, restProps, defaultValue)
      }
      case TEXTAREA_ELEMENT_TYPE: {
        return createElement(TextArea, props, children)
      }
      case UPLOAD_ELEMENT_TYPE: {
        return createElement(Upload, props, children)
      }
      default: {
        if (!children) {
          return createElement(type, props, children)
        } else {
          return createElement(type, props, ...children)
        }
      }
    }
  }

  parseOptionWithDefaultValue = (option, selectName) => {
    const defaultOption = this[`${selectName}_default_option`]
    if (typeof defaultOption === 'array') {
      option = mergeOption(option, defaultOption)
    }
    return option
  }

  render () {
    const elem = this.renderElement(this.renderConfig)
    return (
      <div>
        {elem}
        <div className='clearfix text-center'>
          <Button
            style={{width: '200px'}}
            type='primary'
            onClick={this.handleSubmit}
          >
            提交
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {
    customer = {}, device = {}, issue = {},
    contact = {}
  } = state
  const {customerSelect = []} = customer
  const {deviceSelect = []} = device
  const {issueTypeSelect = []} = issue
  const {contactSelect = []} = contact
  return {
    customerSelect,
    deviceSelect,
    issueTypeSelect,
    contactSelect,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCustomerList: bindActionCreators(customerAction.getCustomerSelect, dispatch),
    getIssueTypeSelect: bindActionCreators(issueAction.getIssueTypeSelect, dispatch),
    getDeviceSelectByCustomer: bindActionCreators(deviceAction.getDeviceSelectByCustomer, dispatch),
    getContactSelect: bindActionCreators(contactActionn.getContactSelect, dispatch),

    submitData: bindActionCreators(commonAction.submitData, dispatch),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))
