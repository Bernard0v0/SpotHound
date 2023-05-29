import {observer} from "mobx-react-lite";
// @ts-ignore
import React from 'react';
import {Button, Form, Input, message} from 'antd';
import {R, User} from "../models/R";
import axios from "axios";
import {runInAction} from "mobx";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import '../css/Main.css'
// @ts-ignore
import Logo from'../image/SpotHound.jpg'
function SignUp(){
    const nav = useNavigate()
    const [form] = Form.useForm();
    const onFinish = async () => {
        const values= await form.validateFields()
        if(values.password === values.confirmedPassword){
            const user:User ={userId:null,userName:values.username,password:values.password,email:values.email}
            const resp = await axios.post<R<any>>("http://localhost:8080/api/sign_up", user)
            runInAction(() => {
                if (resp.data.code === 1) {
                    message.info('Success')
                    nav('/login')
                }
                else{
                    message.error(resp.data.msg)
                }
            })}
        else{
            message.error('Password entered not same')
        }
    };

    return( <> <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: 200, height: 200, backgroundSize: 'contain' }}>
            <img src={Logo} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
        <h1 style={{ color: '#1c305c', marginBottom: '2rem' }}>Spot Hound</h1>
        <Form
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600,paddingRight:50}}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
        >
            <Input style={{ marginLeft: 20 }}/>
        </Form.Item>
        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
        >
            <Input style={{ marginLeft: 20 }}/>
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
        >
            <Input.Password style={{ marginLeft: 20 }}/>
        </Form.Item>
        <Form.Item
            label="Confirm Password"
            name="confirmedPassword"
            rules={[{ required: true, message: ''}]}
        >
            <Input.Password style={{ marginLeft: 20 }}/>
        </Form.Item>
        <div className="password-requirements">
            <dl>
                <dt>Password needs:</dt>
                <dd>-More than 8 characters</dd>
                <dd>-At least one lowercase letter</dd>
                <dd>-At least one uppercase letter</dd>
            </dl>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ background: '#f1c40f', color: '#36454F', marginLeft: 30 }}>
                Sign up
            </Button>
        </Form.Item>
    </Form>
        <a href='/login'>Login</a></div>
    </>)
}
export default observer(SignUp)