// @ts-ignore
import React, {useEffect} from 'react';
import {Button, Form, Input, message} from 'antd';
import {observer} from "mobx-react-lite";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";
// @ts-ignore
import {LoginReq} from "../models/R.tsx";
import {useNavigate} from "react-router-dom";
import '../css/Main.css'
// @ts-ignore
import Logo from'../image/SpotHound.jpg'

function Login() {
    const onFinish = (values: LoginReq) => {
        RoutesStore.login(values)
    };
    const nav = useNavigate()
    useEffect(()=>{
        if(RoutesStore.state === 'done') {
            nav('/')
        } else if(RoutesStore.state === 'error') {
            message.error(RoutesStore.message)
        }
    }, [RoutesStore.state])
    return(
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: 200, height: 200, backgroundSize: 'contain' }}>
                    <img src={Logo} alt="" style={{ width: '100%', height: '100%' }} />
                </div>
                <h1 style={{ color: '#1c305c', marginBottom: '2rem' }}>Spot Hound</h1>
                <Form
                    name="basic"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 ,paddingRight:20}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username/Email"
                        name="user"
                        rules={[{ required: true, message: 'Please input your username/email!' }]}
                    >
                        <Input style={{ marginLeft: 20 }} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password style={{ marginLeft: 20 }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" size='large' htmlType="submit" style={{ background: '#f1c40f', color: '#36454F', marginLeft: 30 }}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <a href="/signup" style={{ marginTop: '1rem',fontSize:16}}>Signup</a>
            </div>
        </>

    );
}

export default observer(Login);