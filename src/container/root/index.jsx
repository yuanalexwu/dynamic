import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
const {Header, Content, Footer, Sider} = Layout
const {Item} = Menu
import {isLogin, getMenu} from 'app/util'
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

    toggleCollapse = () => {
        this.setState({collapsed: !this.state.collapsed})
    }

    buildMenu = () => {
        const menus = getMenu()
        return menus.map((menu, idx) => {
            const {name, path, icon} = menu
            return (
                <Item key={idx}>
                    <Icon type={icon} />
                    <span>{name}</span>
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

    resize = () => {
        if (this.timeoutId) {
            return
        }
        this.timeoutId = setTimeout(() => {
            this.forceUpdate()
            this.timeoutId = undefined
        }, 300)
    }

    render() {
        const {collapsed} = this.state
        const {children} = this.props
        const minHeight = this.getContentHeight()
        console.log('Root render() ', children)
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
                            this.buildMenu()
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
                            {this.props.children || null}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Root