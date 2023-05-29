import {Form, Input, message, Modal, Spin} from "antd";

import {Group} from "antd/lib/radio";
// @ts-ignore
import ParkingspotStore from "../store/ParkingspotStore.tsx";
import {ParkingSpot} from "../models/R";
// @ts-ignore
import React, {useEffect, useState} from "react";
import { Rule } from "antd/lib/form";
import PlacesAutocomplete, {
} from 'react-places-autocomplete';
// @ts-ignore
import { LoadScript } from '@react-google-maps/api';
import axios from "axios";
import {observer} from "mobx-react-lite";

function SpotUpdate(){
    const [searchValue, setSearchValue] = useState("");
    const [form] = Form.useForm()
    const options = [
        { label: 'Light', value: 'Light' },
        { label: 'Normal', value: 'Normal' },
        { label: 'Large', value: 'Large' },
    ]
    const nameRules: Rule[] = [
        { required: true, message: 'Must enter words' },
    ]
    useEffect(() => {
        form.setFieldsValue(ParkingspotStore.parkingspot)
        setSearchValue(ParkingspotStore.parkingspot.address)
    },[ParkingspotStore.parkingspot.spotId])
    function handleAddressSelect(address: string) {
        setSearchValue(address);
        form.setFieldsValue({ address });
    }
    async function onOk(){
        ParkingspotStore.open_update=false
        const values = await form.validateFields()
        try{
        const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: values.address,
                key: "AIzaSyDxc_xS8FibeTmGtymZVVWY2K1EjjKBglE"
            }
        });
        if (response.data.status === "OK" && response.data.results[0].geometry) {

        const { lat, lng } = response.data.results[0].geometry.location;
        const spot:ParkingSpot={spotId:ParkingspotStore.parkingspot.spotId,userId:ParkingspotStore.parkingspot.userId,address:values.address,latitude:lat,longitude:lng,imageUrl:'',description:values.description||'',spotType:values.spotType,createdTime:null,lastUpdateTime:null,isVerified:0,isValid:0,}
        await ParkingspotStore.editspot(spot)
        message.success(ParkingspotStore.message)
    }else{
            message.error("Invalid address or unable to retrieve address information.");
        }}
        catch (e){
                message.error('Something went wrong...')
        }
    }

    function onCancel(){
        ParkingspotStore.open_update=false
        form.setFieldsValue(ParkingspotStore.parkingspot)
    }
    return(   <Modal
        open={ParkingspotStore.open_update}
        title='Update this parkingspot'
        onOk={onOk}
        onCancel={onCancel}
        forceRender={true}>
        <Form form={form}>
            <Form.Item label="Address" name="address" rules={nameRules}>
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
            <Form.Item label="Description" name="description">
                <Input />
            </Form.Item>
            <Form.Item label="Spot type" name="spotType" >
                <Group options={options} optionType="button" buttonStyle="solid"  />
            </Form.Item>
        </Form>
</Modal>)
}
export default observer(SpotUpdate)