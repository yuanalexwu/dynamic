import React, {Component} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
const {Header, Content, Footer, Sider} = Layout
const {Item} = Menu
import {isLogin, getMenu} from 'app/util'
import {APP_PATH_PREFIX} from 'app/common'
import Home from 'app/view/home'
import IssueList from 'app/view/issue_list'
import CreateIssue from 'app/view/create_issue'
import NoMatch from 'app/view/no_match'
import './index.css'

class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
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

    buildMenu = (collapsed) => {
        const menus = getMenu()
        return menus.map((menu, idx) => {
            let {name, path, icon} = menu
            path = `${APP_PATH_PREFIX}${path}`
            const iconStyle = {
                fontSize: collapsed ? '1.5em' : '1em',
                transition: 'all .3s'
            }
            const menuName = !collapsed ? <span>{name}</span> : null
            return (
                <Item key={idx}>
                    <Link to={path}>
                        <Icon type={icon} style={iconStyle}/>
                        {menuName}
                    </Link>
                </Item>
            )
        })
    }

    getContentHeight = () => {
        const windowHeight = document.body.clientHeight
        const headerBarHeight = 64
        const contentHeight = 24
        const footerBarHeight = 66
        return windowHeight - headerBarHeight - contentHeight - footerBarHeight
    }

    render() {
        const {collapsed} = this.state
        const {children} = this.props
        const minHeight = this.getContentHeight()
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <div className="root-logo">DHMS</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        {
                            this.buildMenu(collapsed)
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggleCollapse}
                            className="root-side-trigger"
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight }}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/issue_list" component={IssueList} />
                                <Route path="/create_issue" component={CreateIssue} />
                                <Route component={NoMatch} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        DHMS ©2017 Use Antd
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Root