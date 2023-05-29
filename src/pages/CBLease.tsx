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
import { Space} from "antd";

// @ts-ignore
import CBDelete from "./CBDelete.tsx";

import {Table} from "antd/lib";

function CBLease(){
    useEffect(()=>{
       BookingStore.getCBLease(RoutesStore.userid)
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
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, booking) => {
                return (
                    <>
                        <Space>
                            <CBDelete booking={booking}></CBDelete>
                        </Space>
                    </>
                )
            },
        },

    ]
    return(<><h2 style={{margin:10 ,color:"#1c305c"}}>Current & future booking you made...</h2><Table
        columns={columns}
        dataSource={BookingStore.bookings}
    ></Table></>)
}
export default observer(CBLease)