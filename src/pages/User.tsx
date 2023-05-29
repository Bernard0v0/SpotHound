import {observer} from "mobx-react-lite";
import {Button} from "antd";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";
import {Outlet, useNavigate} from "react-router-dom";
// @ts-ignore
import React from "react";

function User(){
    const nav = useNavigate()
    function onClick() {
        RoutesStore.reset()
        nav('/login')
    }
    return(<><div style={{textAlign:"center" }}>
        <h2 >User Id: {RoutesStore.userid}</h2><br />
        <h2>User Name: {RoutesStore.username}</h2><br />
        <Button size='large' type='primary' onClick={onClick} style={{ background: '#f1c40f', color: '#36454F' ,margin:10}}>Log out</Button></div>
    <Outlet></Outlet></>)
}
export default observer(User)