
// @ts-ignore
import React, {useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";
import {observer} from "mobx-react-lite";
import { Layout, Menu} from 'antd';
import {Content, Header} from "antd/es/layout/layout";
import '../css/Main.css'
// @ts-ignore
import Logo from'../image/SpotHound.jpg'


// @ts-ignore
function Main1(){
    const nav = useNavigate()
    useEffect(()=>{
        if(RoutesStore.token!=''){
            nav('/findspot')
        }
    },[])
    if(RoutesStore.username === '') {
        return <Navigate to='/login'></Navigate>
    }

    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center',background:"#1c305c"}}>
                <div className="demo-logo" ><img src={Logo} alt={''} ></img></div>
                <span style={{color:"white",margin:"0 14px"}} >Welcome!【{RoutesStore.username}】</span>
                <div style={{width:1000}}>
                <Menu
                    style={{ minWidth: 0, flex: "auto",background:"#1c305c"}}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0001']}
                    items={RoutesStore.navmenus}
                />
            </div>
            </Header>
            <Content style={{ padding: '0 50px' ,background:"#1c305c54"}}>
                <Outlet></Outlet>
            </Content>

        </Layout>
    )
}
export default observer(Main1)
