import {observer} from "mobx-react-lite";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";
import { SearchOutlined} from '@ant-design/icons';
// @ts-ignore
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, DatePicker, Form, Input, message, Result, Spin} from "antd";
import {LoadScript} from "@react-google-maps/api";
import PlacesAutocomplete from "react-places-autocomplete";
import {Group} from "antd/lib/radio";
import {Rule} from "antd/lib/form";
// @ts-ignore
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
// @ts-ignore
import { SearchResult} from "../models/R.tsx";
// @ts-ignore
import moment from "moment";
// @ts-ignore
import SearchStore from "../store/SearchStore.tsx";
import axios from "axios";
// @ts-ignore
import {ColumnsType} from "antd/lib/table";
import {Table} from "antd/lib";
// @ts-ignore
import BookingCreate from "./BookingCreate.tsx";
// @ts-ignore
import BookingStore from "../store/BookingStore.tsx";
import "../css/Main.css"

function Findparkingspot(){

    useEffect(()=>{
        SearchStore.message=''
        SearchStore.searchresult=[]
        SearchStore.showstate=false
        SearchStore.ordertype='distance'
        SearchStore.startTime=''
        SearchStore.endTime=''
        SearchStore.loading=true

    },[SearchStore.searchbarstate])
    useEffect(()=>{
        SearchStore.searchbarstate=true
    },[])
    const [form] = Form.useForm();
    const nav = useNavigate()
    const [searchValue, setSearchValue] = useState("");
    const options = [
        { label: "Distance", value: "distance" },
        { label: "TotalPrice", value: "totalprice" },
    ];
    const options2 = [
        { label: "Light", value: "Light" },
        { label: "Normal", value: "Normal" },
        { label: "Large", value: "Large" },
    ];
    const nameRules: Rule[] = [{ required: true, message: "Must enter an address" }];
    const selectRules: Rule[]=[{required:true, message :"Must select a type"}];
    const slotRules: Rule[]=[{required:true, message :"Must select a time"}];
    function handleAddressSelect(address: string) {
        setSearchValue(address);
        form.setFieldsValue({ address });
    }
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day').subtract(1,"day");
    };
    const columns:ColumnsType<SearchResult>=[
        {
            title:'Spot Id',
            dataIndex:'spotId',
        },
        {
            title:'Spot Address',
            dataIndex:'address',
        },
        {
            title:'Lessor Id',
            dataIndex:'userId',
        },
        {
            title:'Description',
            dataIndex:'description',
        },
        {
            title:'Distance(m)',
            dataIndex:'distance',
        },
        {
            title:'Total price',
            dataIndex:'totalPrice',
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, spot) => {
                return (
                    <>
                        <BookingCreate res={spot}></BookingCreate>
                    </>
                )
            }}]
         const OnSearchfinish=async (value) => {
        const formData = new FormData();
        try{
             const values = await form.validateFields();
             form.resetFields()
             setSearchValue('')
             const currentTime = dayjs();
            formData.append('userId',RoutesStore.userid)
             if (values.startTime.isBefore(currentTime)) {
                 throw new Error('Start time must be later than the current time.');
             }
             if (values.endTime.isBefore(values.startTime)) {
                 throw new Error('End time must be later than the start time.');
             }
             if (values.endTime.diff(values.startTime, 'minute') < 15) {
                 throw new Error('slot must be longer than 15 minute');
             }
             SearchStore.startTime=moment(values.startTime.toISOString()).format("YYYY-MM-DD HH:mm:ss")
             SearchStore.endTime=moment(values.endTime.toISOString()).format("YYYY-MM-DD HH:mm:ss")
             const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                 params: {
                     address: values.address,
                     key: "AIzaSyDxc_xS8FibeTmGtymZVVWY2K1EjjKBglE"
                 }
             });
             if (response.data.status === "OK" && response.data.results[0].geometry) {
                 const {lat, lng} = response.data.results[0].geometry.location;
                 formData.append('latitude',lat)
                 formData.append('longitude',lng)
             } else {
                 message.error("Invalid address or unable to retrieve address information.")
                 return
             }
             formData.append('startTime',SearchStore.startTime)
             formData.append('endTime', SearchStore.endTime)
             formData.append('spotType', values.spotType)
             SearchStore.ordertype = values.orderType
          }

             catch (e){
                message.error('verification error')
             }
             try{
             SearchStore.showstate=true
             await SearchStore.search(formData);}
             catch (e){
                 SearchStore.showstate=false
                 message.error('Something went wrong...')
             }
             message.info(SearchStore.message);
             if (SearchStore.searchresult != undefined) {
                 SearchStore.showstate = true
             }
         }

    return ( <><div style={{display: SearchStore.searchbarstate ? 'block' : 'none' }}>
        <h2 style={{margin:10 ,color:"#1c305c"}}>Find and book a spot</h2>
        <Form  form={form} onFinish={OnSearchfinish} style={{marginTop:20}}>
        <Form.Item  label="Address" name="address" rules={nameRules} >
            <LoadScript googleMapsApiKey="AIzaSyDxc_xS8FibeTmGtymZVVWY2K1EjjKBglE&libraries=places">
                <PlacesAutocomplete
                    value={searchValue}
                    onChange={(value) => setSearchValue(value)}
                    onSelect={handleAddressSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <Input {...getInputProps()} placeholder='Enter an address' />
                            <div className="suggestions-container">
                                {loading && <Spin />}
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        {...getSuggestionItemProps(suggestion)}
                                        key={index}
                                        className="suggestion-item"
                                    >
                                        {suggestion.description}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </LoadScript>
        </Form.Item>

        <Form.Item  label="Start Time" name="startTime" rules={slotRules} style={{display:"flex",justifyContent:"center"}}>
            <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
            />
        </Form.Item>
        <Form.Item  label="End Time" name="endTime" rules={slotRules} style={{display:"flex",justifyContent:"center"}}>
            <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
            />
        </Form.Item>
        <Form.Item  label="Spot type" name="spotType" rules={selectRules} style={{display:"flex",justifyContent:"center"}}>
            <Group options={options2} optionType="button" buttonStyle="solid"  />
        </Form.Item>
        <Form.Item label="Order Type" name="orderType" rules={selectRules} style={{display:"flex",justifyContent:"center"}}>
            <Group options={options} optionType="button" buttonStyle="solid"  />
        </Form.Item>
    <Form.Item style={{display:"flex",justifyContent:"center"}}>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />} style={{background:'#f1c40f',color:"#36454F"}}>
            Search
        </Button>
    </Form.Item>
    </Form>
        </div>
        <div style={{display: BookingStore.resshowstate ? 'block' : 'none' }}>
            <Result
                status="success"
                title="Successfully book this spot"
                subTitle={`Your order number:${BookingStore.refNr}  Check detailed information in "My booking" page`}
                extra={[
                    <Button type="primary" key="find" onClick={()=>{BookingStore.resshowstate=false
                        nav("/findspot")
                        SearchStore.searchbarstate=true}}
                    style={{background:'#f1c40f',color:"#36454F"}}>
                        Find & Book another spot
                    </Button>,
                    <Button key="checkinfo" onClick={()=>{BookingStore.resshowstate=false
                        nav("/currentbooking_lease")
                        SearchStore.searchbarstate=true}}>Check Booking</Button>,
                ]}
                style={{ background: "#1c305c5c"}}
            />
        </div>
        <div style={{display: SearchStore.showstate ? 'block' : 'none' }}>
    <Table
        columns={columns}
        dataSource={SearchStore.searchresult}
        loading={SearchStore.loading}
    ></Table></div></>)
}
export default observer(Findparkingspot)