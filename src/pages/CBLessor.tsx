import {observer} from "mobx-react-lite";
// @ts-ignore
import React, {useEffect} from "react";
// @ts-ignore
import BookingStore from "../store/BookingStore.tsx";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";
import {ColumnsType} from "antd/lib/table";
// @ts-ignore
import {Booking} from "../models/R.tsx";
import {Table} from "antd/lib";

function CBLessor(){
    useEffect(()=>{
        BookingStore.getCBLessor(RoutesStore.userid)
    },[])
    const columns:ColumnsType<Booking>=[
        {
            title:'Booking Id',
            dataIndex:'referenceId',
        },
        {
            title:'Spot Id',
            dataIndex:'spotId',
        },
        {
            title:'Spot Address',
            dataIndex:'spotAddress',
        },
        {
            title:'Lease Id',
            dataIndex:'leaseId',
        },
        {
            title:'Start Time',
            dataIndex:'startTime',
        },
        {
            title:'End Time',
            dataIndex:'endTime',
        },
        {
            title:'Total Price',
            dataIndex:'totalPrice',
        }

    ]
    return(<><h2 style={{margin:10 ,color:"#1c305c"}}>Current & future booking at your spots...</h2><Table
        columns={columns}
        dataSource={BookingStore.bookings}
    ></Table></>)

}
export default observer(CBLessor)