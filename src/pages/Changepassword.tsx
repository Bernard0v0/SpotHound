import {observer} from "mobx-react-lite";
import {Button, Form, Input, message} from "antd";
// @ts-ignore
import React from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import {ChangePassword, R} from "../models/R.tsx";
import axios from "axios";
import {runInAction} from "mobx";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";

function Changepassword(){
    const nav = useNavigate()
    const [form] = Form.useForm();
    const onFinish = async () => {
        const values= await form.validateFields()
        if(values.password === values.confirmedPassword){
            const formData = new FormData();
            const psw:ChangePassword={userName:RoutesStore.username,formerPassword:values.currentPassword,newPassword:values.password}
            formData.append('userName', psw.userName);
            formData.append('formerPassword', psw.formerPassword);
            formData.append('newPassword',psw.newPassword)
            const resp = await axios.post<R<null>>("http://localhost:8080/api/change_password", formData)
            runInAction(() => {
                if (resp.data.code === 1) {
                    form.resetFields()
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
    return(<><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Form
            name="basic"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        ><h2 style={{textAlign:"center"}}>Change your password</h2>
            <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please enter the password!' }]}
            >
                <Input.Password style={{marginLeft:20}}/>
            </Form.Item>
            <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: 'Please enter the password!' }]}
            >
                <Input.Password style={{marginLeft:20}}/>
            </Form.Item>
            <Form.Item
                label="Confirm Password"
                name="confirmedPassword"
                rules={[{ required: true, message: '' }]}

            >
                <Input.Password style={{marginLeft:20}}/>
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
                <Button type="primary" htmlType="submit" style={{ background: '#f1c40f', color: '#36454F' ,margin:10}}>
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    </div></>)
}
export default observer(Changepassword)