import {observer} from "mobx-react-lite";
import {ColumnsType} from "antd/lib/table";
import {ParkingSpot} from "../models/R";
import {Button, Space} from "antd";
// @ts-ignore
import ParkingspotStore from "../store/ParkingspotStore.tsx";
// @ts-ignore
import React, {useEffect} from "react";
import {Table} from "antd/lib";

function Verification(){
    useEffect(()=>{
        ParkingspotStore.getverifspot()
    },[])
    const columns:ColumnsType<ParkingSpot>=[
        {
            title:'Spot Id',
            dataIndex:'spotId',
        },
        {
            title:'Spot Address',
            dataIndex:'spotAddress',
        },
        {
            title:'Description',
            dataIndex:'description',
        },
        {
            title:'Spot Type',
            dataIndex:'spotType',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, spot) => {
                return (
                    <>
                        <Space>
                            <Button
                                type='primary'
                                size='middle'
                                onClick={() => {
                                    ParkingspotStore.validspot(spot)
                                }}>
                                Valid
                            </Button>
                            <Button
                                type='primary'
                                size='middle'
                                onClick={() => {
                                    ParkingspotStore.invalidspot(spot)
                                }} danger>
                                Invalid
                            </Button>
                        </Space>
                    </>
                )
            }}]
    return(<> <h2 style={{margin:10 ,color:"#1c305c",marginTop:10,marginBottom:10}}>Spot verification</h2><Table
        columns={columns}
        dataSource={ParkingspotStore.verifparkingspots}

    ></Table></>)
}
export default observer(Verification)