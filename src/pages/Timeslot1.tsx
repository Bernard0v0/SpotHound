import {observer} from "mobx-react-lite";
import {ColumnsType} from "antd/lib/table";
// @ts-ignore
import {ParkingSpot, Timeslot} from "../models/R.tsx";
import {Button, Select, Space} from "antd";
// @ts-ignore
// @ts-ignore
import ParkingspotStore from "../store/ParkingspotStore.tsx";
// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore

import {Table} from "antd/lib";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";
// @ts-ignore
import TimeslotStore from "../store/TimeslotStore.tsx";
// @ts-ignore
import TimeslotDelete from "./TimeslotDelete.tsx";
// @ts-ignore
import TimeslotUpdate from "./TimeslotUpdate.tsx";
// @ts-ignore
import TimeslotCreate from "./TimeslotCreate.tsx";


function Timeslot1(){

    useEffect(() => {
        const fetchData = async () => {
            await ParkingspotStore.viewspot(RoutesStore.userid);
            setForm1([ParkingspotStore.spotid])
            TimeslotStore.viewslots(ParkingspotStore.spotid);
            TimeslotStore.option = ParkingspotStore.parkingspots.map((spot: ParkingSpot) => {
                return {
                    label: spot.address,
                    value: spot.spotId
                };
            });
        };

        fetchData();
    }, [ParkingspotStore.spotid]);

    function onChange(value){
        ParkingspotStore.spotid= value
    }
    const columns:ColumnsType<Timeslot>=[
        {
            title:'Timeslot Id',
            dataIndex:'timeSlotId',
        },
        {
            title:'Spot Id',
            dataIndex:'spotId',
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
            title:'Price(quarter)',
            dataIndex:'pricePerQuarter',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, slot) => {
                return (
                    <>
                        <Space>
                            <TimeslotDelete slot={slot}></TimeslotDelete>
                            <Button
                                type='default'
                                size='small'
                                onClick={() => {
                                    TimeslotStore.open_update=true
                                    TimeslotStore.timeslot=slot
                                }}>
                                Update
                            </Button>
                        </Space>
                    </>
                )
            },
        },

    ]
    const [form1, setForm1] = useState<number[]>([ParkingspotStore.spotid]);
    return(<div>
        <h2 style={{margin:10 ,color:"#1c305c"}}>Available Timeslot of your spots</h2>
        <div>
            <h3 style={{margin:10 ,color:"#1c305c",display:"inline"}}>Spots:</h3>
            <Select
                style={{ width: 500 }}
                placeholder='Select a Spot'
                onChange={onChange}
                value={form1}
                options={TimeslotStore.option}
            >
            </Select>
            <TimeslotUpdate formerslot={TimeslotStore.timeslot}></TimeslotUpdate>
            <TimeslotCreate></TimeslotCreate>
            <Button type='primary' style={{background:'#f1c40f',color:"#36454F",float:"right"}} onClick={()=>{
                TimeslotStore.open_create=true
            }}>Create a slot</Button>
        </div>
        <Table
            columns={columns}
            dataSource={TimeslotStore.timeslots}
            style={{marginTop:20}}
        ></Table>
    </div>)
}

export default observer(Timeslot1)