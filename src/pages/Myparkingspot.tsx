import {observer} from "mobx-react-lite";
import {ColumnsType} from "antd/lib/table";
import {ParkingSpot} from "../models/R";
import {Button, Space} from "antd";
// @ts-ignore
import SpotDelete from "./SpotDelete.tsx";
// @ts-ignore
import ParkingspotStore from "../store/ParkingspotStore.tsx";
// @ts-ignore
import React, {useEffect} from "react";
// @ts-ignore
import SpotUpdate from "./SpotUpdate.tsx";
import {Table} from "antd/lib";
// @ts-ignore
import SpotCreate from "./SpotCreate.tsx";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";

function Myparkingspot(){
    useEffect(()=>{
        ParkingspotStore.viewspot(RoutesStore.userid)
    },[])

const columns:ColumnsType<ParkingSpot>=[
    {
        title:'Spot Id',
        dataIndex:'spotId',
    },
    {
        title:'Spot Address',
        dataIndex:'address',
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
        title:'Created Time',
        dataIndex:'createdTime',
    },
    {
        title:'Last Update',
        dataIndex:'lastUpdatedTime',
    },
    {
        title:'Is Verified',
        dataIndex:'isVerified',
    },
    {
        title:'Is valid',
        dataIndex:'isValid',
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        render: (_, spot) => {
            return (
                <>
                    <Space>
                        <SpotDelete spot={spot}></SpotDelete>
                        <Button
                            type='default'
                            size='small'
                            onClick={() => {
                                ParkingspotStore.open_update=true
                                ParkingspotStore.parkingspot=spot
                            }}>
                            Update
                        </Button>
                    </Space>
                </>
            )
        },
    },

]
    return(<div>
        <div>
        <SpotUpdate></SpotUpdate>
        <SpotCreate></SpotCreate>
            <h2 style={{margin:10 ,color:"#1c305c"}}>My Parking spot</h2>
            <Button type='primary' style={{ background: '#f1c40f', color: '#36454F' ,margin:10}} onClick={()=>{
                ParkingspotStore.open_create=true
            }}>Create a spot</Button>
        </div>
        <Table
            columns={columns}
            dataSource={ParkingspotStore.parkingspots}
            ></Table>
        </div>)
}
export default observer(Myparkingspot)