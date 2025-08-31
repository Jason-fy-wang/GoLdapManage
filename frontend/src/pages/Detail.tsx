import React from "react"
import { Layout,Menu } from "antd"
import { LHeader } from "../component/LHeader"
import { HomeOutlined, MailOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Outlet } from "react-router"
import { useNavigate } from "react-router"

function Detail() {
    const {Content, Sider} = Layout

    const navigate = useNavigate()

    const layoutStyle:React.CSSProperties = {
        borderRadius:8,
        width: "100vw",
        height: "100vh",
        margin: 0,
    }

    const contentStyle:React.CSSProperties = {
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#0958d9",
    }

    const sideStyle:React.CSSProperties= {
        textAlign: 'center',
        lineHeight: '200px',
        color: '#fff',
        backgroundColor: '#1677ff',
    }

    type MenuItem = Required<MenuProps>['items'][number]

    const items:MenuItem[] = [
        {key: 'record',icon:<HomeOutlined/>, label:'Home'},
        {
            key: 'sub1',
            label: 'navigation1',
            icon: <MailOutlined/>,
            children: [
                {key:'sub1-2', label: "123"}
            ]

        }
    ]

    const menuSelect: MenuProps['onSelect'] = ({item, key, keyPath, selectedKeys, domEvent})=>{
        console.log('item: ', item, ", key:", key, ", keypath:", keyPath, ", selectKeys: ", selectedKeys, ", domevent: ", domEvent.type)
        navigate("record")
    }


    return (
        <>
        <Layout style={layoutStyle}>
            <LHeader></LHeader>
            <Layout>
                <Sider style={sideStyle} width='220px'>
                    <Menu
                     style={{width:'100%', height:'100%'}}
                     mode="inline" 
                     theme="dark" 
                     onSelect={menuSelect}
                     items={items}
                     />

                </Sider>
                <Content style={contentStyle}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
        </>
    )
}


export {Detail}
