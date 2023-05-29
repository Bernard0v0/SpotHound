import {observer} from "mobx-react-lite";
// @ts-ignore
import React, {useEffect} from "react";
// @ts-ignore
import BookingStore from "../store/BookingStore.tsx";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";
// @ts-ignore
import {ColumnsType} from "antd/lib/table.tsx";
// @ts-ignore
import {Booking} from "../models/R.tsx";
import {Table} from "antd/lib";

function BHLease(){
    useEffect(()=>{
        BookingStore.getBHLease(RoutesStore.userid)
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
            title:'Lessor Id',
            dataIndex:'lessorId',
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
    return(<><h2 style={{margin:10 ,color:"#1c305c"}}>You booked...</h2><Table
        columns={columns}
        dataSource={BookingStore.bookings}
    ></Table></>)


}
export default observer(BHLease)