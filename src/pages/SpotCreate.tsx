
import {Form, Input, List, message, Modal, Spin} from "antd";
import { Group } from "antd/lib/radio";
// @ts-ignore
import ParkingspotStore from "../store/ParkingspotStore.tsx";
import { ParkingSpot } from "../models/R";
// @ts-ignore
import React, { useState } from "react";
import { Rule } from "antd/lib/form";
import PlacesAutocomplete from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import axios from "axios";
import { observer } from "mobx-react-lite";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";

function SpotCreate() {
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState("");
    const options = [
        { label: "Light", value: "Light" },
        { label: "Normal", value: "Normal" },
        { label: "Large", value: "Large" },
    ];
    const nameRules: Rule[] = [{ required: true, message: "Must enter words" }];
    const selectRules: Rule[]=[{required:true, message :"Must select a type"}];
    async function onOk() {
        ParkingspotStore.open_create = false;
        const values = await form.validateFields();
        try{
        const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: values.address,
                key: "AIzaSyDxc_xS8FibeTmGtymZVVWY2K1EjjKBglE"
            }
        });
        if (response.data.status === "OK" && response.data.results[0].geometry) {
            const { lat, lng } = response.data.results[0].geometry.location;
            const spot: ParkingSpot = {
                spotId: null,
                userId: RoutesStore.userid,
                address: values.address,
                latitude: lat,
                longitude: lng,
                imageUrl: "",
                description: values.description||'',
                spotType: values.spotType,
                createdTime: null,
                lastUpdateTime: null,
                isVerified: 0,
                isValid: 0,
            };
            await ParkingspotStore.createspot(spot);
            form.resetFields()
            setSearchValue('')
            message.success(ParkingspotStore.message);
        } else {
            message.error("Invalid address or unable to retrieve address information.");
        }}
        catch (e){
            message.error('Something went wrong...')
        }
    }


    function onCancel() {
        form.resetFields()
        ParkingspotStore.open_create = false;
        setSearchValue('')
    }

    function handleAddressSelect(address: string) {
        setSearchValue(address);
        form.setFieldsValue({ address });
    }

    return (
        <Modal
            open={ParkingspotStore.open_create}
            title="Create a parking spot"
            onOk={onOk}
            onCancel={onCancel}
            forceRender={true}
        >
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
                <Form.Item label="Spot type" name="spotType" rules={selectRules}>
                    <Group options={options} optionType="button" buttonStyle="solid"  />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default observer(SpotCreate);
