import React from "react";
import type { FormProps } from "antd";
import {Layout, Card, Form, Button, Input, message} from "antd";
import { useNavigate } from "react-router";
import { LHeader } from "../component/LHeader";
import { login } from "./api/apis";


function Login() {
    const [messageApi, contentHolder] = message.useMessage();
    
    const {Footer, Content, Sider} = Layout

    const navigate = useNavigate()

    const layoutStyle:React.CSSProperties = {
        borderRadius:8,
        overflow: 'hidden',
        width: "100vw",
        height: "100vh",
        margin: 0,
    }

    const contentStyle:React.CSSProperties = {
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#0958d9",
    }

    const footerStyle:React.CSSProperties = {
        textAlign: 'center',
        color: "#fff",
        backgroundColor: "#4096ff"
    }

    const sideStyle:React.CSSProperties= {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#1677ff',
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
    }


    type FieldType = {
        username?:string;
        password?:string;
        host?: string;
        port?: string;
    }


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log(values)
        const {username, password,host, port} = values
        if(username === undefined || password === undefined || host === undefined || port === undefined){
            messageApi.warning("please input login info")
            return
        }
        login(username, password, host, port).then(resp => {
            localStorage.setItem("token", resp.data.token)
            messageApi.success("login success")
            navigate("/detail")
        }).catch(err => {
            console.log("login error: ", err)
            messageApi.error("login fail: ", err)
        })
    }

    const onFinishFailed:FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("fail", errorInfo)
    }

    return (
        <>
        {contentHolder}
        <Layout style={layoutStyle}>
            <LHeader/>
            <Layout>
                <Content style={contentStyle}>Content</Content>
                <Sider style={sideStyle} width={550}>
                    <Card title="Login" variant="borderless" style={{"marginTop": "200px", "width":"450px"}}>
                        <Form name="basic"
                        labelCol={{span:8}}
                        wrapperCol={{span:16}}
                        style={{maxWidth: 600}}
                        initialValues={{port: "389", host:"192.168.20.10"}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Username"
                                name="username"
                                rules={[{required: true, message: "Please input your username (dn)"}]}
                            > 
                                <Input/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[{required:true, message:"Please input your password"}]}
                            >
                                <Input.Password/>
                            
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Host"
                                name="host"
                                rules={[{required: true, message: "Please input ldap host"}]}
                            > 
                                <Input/>
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Port"
                                name="port"
                                rules={[{required: true, message: "Please input ldap port"}]}
                            > 
                                <Input/>
                            </Form.Item>
                            <Form.Item label={null}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Sider>
            </Layout>
            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
        </>
    )
}


export {Login}