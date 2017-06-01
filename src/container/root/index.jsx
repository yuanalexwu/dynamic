import React, {Component} from 'react'
import {Route, Link, Switch, Redirect} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
import {getUserInfo, getMenu, parsePathWithAppPrefix} from 'app/util'
import Home from 'app/view/home'
import IssueList from 'app/view/issue_list'
import CreateIssue from 'app/view/create_issue'
import EditIssue from 'app/view/edit_issue'
import NoMatch from 'app/view/no_match'
import './index.css'
import UserBar from 'app/view/user_bar'
const {Header, Content, Footer, Sider} = Layout
const {Item} = Menu

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    if (this.timeoutId) {
      return
    }
    this.timeoutId = setTimeout(() => {
      this.forceUpdate()
      this.timeoutId = undefined
    }, 300)
  }

  toggleCollapse = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  getMenuInfo = (collapsed, currentPath) => {
    const menus = getMenu()
    let selectedKey = ''
    const menuItems = menus.map((menu, idx) => {
      let {name, path, icon} = menu
      path = parsePathWithAppPrefix(path)
      if (currentPath === path) {
        selectedKey = `${idx}`
      }
      const iconStyle = {
        fontSize: collapsed ? '1.5em' : '1em',
        transition: 'all .3s'
      }
      const menuName = !collapsed ? <span>{name}</span> : null
      return (
        <Item key={idx}>
          <Link to={path}>
            <Icon type={icon} style={iconStyle} />
            {menuName}
          </Link>
        </Item>
      )
    })
    return {menuItems, selectedKey}
  }

  getContentHeight = () => {
    const windowHeight = document.body.clientHeight
    const headerBarHeight = 64
    const contentHeight = 24
    const footerBarHeight = 66
    return windowHeight - headerBarHeight - contentHeight - footerBarHeight
  }

  render () {
    const userInfo = getUserInfo()
    if (!userInfo) {
      return <Redirect to={parsePathWithAppPrefix('/login')} />
    }
    const {collapsed} = this.state
    const {location = {}} = this.props
    const {pathname: currentPath = ''} = location
    const minHeight = this.getContentHeight()
    const {menuItems, selectedKey} = this.getMenuInfo(collapsed, currentPath)
    return (
      <Layout>
        <Sider
          breakpoint='lg'
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Link to={parsePathWithAppPrefix('/')}>
            <div className='root-logo'>DHMS</div>
          </Link>
          <Menu theme='dark' mode='inline' selectedKeys={[selectedKey]}>
            {menuItems}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <div className='service-head'>
              <span style={{lineHeight: '75px'}}>
                <Icon
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggleCollapse}
                  className='root-side-trigger'
              />
              </span>
              <UserBar />
            </div>
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div style={{minHeight}}>
              <Switch>
                <Route exact path={parsePathWithAppPrefix('/')} component={Home} />
                <Route exact path={parsePathWithAppPrefix('/create_issue')} component={CreateIssue} />
                <Route exact path={parsePathWithAppPrefix('/edit_issue/:issue_id')} component={EditIssue} />
                <Route path={parsePathWithAppPrefix('/issue_list/:issue_stat')} component={IssueList} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            DHMS ©2017 Use Antd
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Root
