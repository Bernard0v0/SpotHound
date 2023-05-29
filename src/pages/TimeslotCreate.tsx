
import {ConfigProvider, DatePicker, Form,  InputNumber, message, Modal, Select} from "antd";
// @ts-ignore
// @ts-ignore
import { Timeslot} from "../models/R.tsx";
// @ts-ignore
import React from "react";
import { Rule } from "antd/lib/form";
// @ts-ignore
import moment from "moment";
import { observer } from "mobx-react-lite";
// @ts-ignore
import TimeslotStore from "../store/TimeslotStore.tsx";
// @ts-ignore
import dayjs from "dayjs";
import 'dayjs/locale/en';
import locale from "antd/locale/en_US";
import 'dayjs/locale/en'
import {RangePickerProps} from "antd/es/date-picker";

function TimeslotCreate() {

    const [form] = Form.useForm();
    const selectRules: Rule[]=[{required:true, message :"Must select a spot"}];
    const slotRules: Rule[]=[{required:true, message :"Must select a time"}];
    const priceRules:Rule[]=[
        { required: true, message: 'Must enter price' },
        { min: 1, type: 'number', message: 'Out of range' },
        { max: 100, type: 'number', message: 'Out of range' },
    ]
    async function onOk() {
        TimeslotStore.open_create = false;
        try {
            const values = await form.validateFields();

            const currentTime = dayjs();

            if (values.startTime.isBefore(currentTime)) {
                throw new Error('Start time must be later than the current time.');
            }

            if (values.endTime.isBefore(values.startTime)) {
                throw new Error('End time must be later than the start time.');
            }
            if(values.endTime.diff(values.startTime,'minute')<15){
                throw new Error('slot must be longer than 15 minute');
            }

            const slot: Timeslot = {
                timeSlotId: null,
                spotId: values.spotId,
                startTime: moment(values.startTime.toISOString()).format("YYYY-MM-DD HH:mm:ss"),
                endTime: moment(values.endTime.toISOString()).format("YYYY-MM-DD HH:mm:ss"),
                pricePerQuarter: values.pricePerQuarter
            };
            console.log(slot)
            await TimeslotStore.createslot(slot);
            form.resetFields();
            message.info(TimeslotStore.message);
        } catch (error) {
            form.resetFields()
            message.error('Validation error');
            return
        }
    }


    function onCancel() {
        form.resetFields()
        TimeslotStore.open_create = false;

    }

    // @ts-ignore



// eslint-disable-next-line arrow-body-style
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day').subtract(1,"day");
    };

    return (
        <ConfigProvider locale={locale}>
        <Modal
            open={TimeslotStore.open_create}
            title="Create a timeslot"
            onOk={onOk}
            onCancel={onCancel}
            forceRender={true}
        >
            <Form form={form}>
                <Form.Item label="Spot address" name="spotId" rules={selectRules}>
                    <Select
                        placeholder="Select a spot"
                        options={TimeslotStore.option}
                    >
                    </Select>
                </Form.Item>
                <Form.Item label="Start Time" name="startTime" rules={slotRules}>
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                    />
                </Form.Item>
                <Form.Item label="End Time" name="endTime" rules={slotRules}>
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                    />
                </Form.Item>
                <Form.Item label="Price/quarter:should in [1,100]" name="pricePerQuarter" rules={priceRules}>
                    <InputNumber></InputNumber>
                </Form.Item>
            </Form>
        </Modal>
        </ConfigProvider>
    );
}

export default observer(TimeslotCreate);
