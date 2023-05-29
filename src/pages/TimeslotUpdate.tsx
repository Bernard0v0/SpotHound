import {DatePicker, Form, InputNumber,  message, Modal} from "antd";

// @ts-ignore
import {Timeslot} from "../models/R.tsx";
// @ts-ignore
import React, {useEffect} from "react";
import { Rule } from "antd/lib/form";
// @ts-ignore
import {observer} from "mobx-react-lite";
// @ts-ignore
import TimeslotStore from "../store/TimeslotStore.tsx";
// @ts-ignore
import dayjs from 'dayjs';
import {RangePickerProps} from "antd/es/date-picker";
// @ts-ignore
import moment from "moment";

function TimeslotUpdate({formerslot}:{formerslot:Timeslot}){
    const [form] = Form.useForm()

    const slotRules: Rule[] = [
        { required: true, message: 'Must enter a time' },
    ]
    const priceRules:Rule[]=[
        { required: true, message: 'Must enter price' },
        { min: 1, type: 'number', message: 'Out of range' },
        { max: 100, type: 'number', message: 'Out of range' },
    ]

    useEffect(() => {
        TimeslotStore.completeslot=[]
        TimeslotStore.completeslot.push(formerslot)
        const temp:Timeslot={timeSlotId:TimeslotStore.timeslot.timeSlotId,spotId:TimeslotStore.timeslot.spotId,startTime:null,endTime:null,pricePerQuarter:TimeslotStore.timeslot.pricePerQuarter}
        form.setFieldsValue(temp)
    },[TimeslotStore.timeslot.timeSlotId])

    async function onOk() {
        TimeslotStore.open_update = false;
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
                timeslotId: TimeslotStore.timeslot.timeSlotId,
                spotId: TimeslotStore.timeslot.spotId,
                startTime: moment(values.startTime.toISOString()).format("YYYY-MM-DD HH:mm:ss"),
                endTime: moment(values.endTime.toISOString()).format("YYYY-MM-DD HH:mm:ss"),
                pricePerQuarter: values.pricePerQuarter
            };
            TimeslotStore.completeslot.push(slot)
            console.log(TimeslotStore.completeslot)
            await TimeslotStore.editslot(TimeslotStore.completeslot);
            TimeslotStore.completeslot=[]
            message.info(TimeslotStore.message);
        } catch (error) {
            const temp:Timeslot={timeSlotId:TimeslotStore.timeslot.timeSlotId,spotId:TimeslotStore.timeslot.spotId,startTime:null,endTime:null,pricePerQuarter:TimeslotStore.timeslot.pricePerQuarter}
            form.setFieldsValue(temp)
            TimeslotStore.completeslot=[]
            message.error('Validation error');
        }
    }

    function onCancel(){
        TimeslotStore.open_update=false
        const temp:Timeslot={timeSlotId:TimeslotStore.timeslot.timeSlotId,spotId:TimeslotStore.timeslot.spotId,startTime:null,endTime:null,pricePerQuarter:TimeslotStore.timeslot.pricePerQuarter}
        form.setFieldsValue(temp)
        TimeslotStore.completeslot=[]
    }
    // @ts-ignore


// eslint-disable-next-line arrow-body-style
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day').subtract(1,"day");
    };



    return(   <Modal
        open={TimeslotStore.open_update}
        title='Update this timeslot'
        onOk={onOk}
        onCancel={onCancel}
        forceRender={true}>
        <Form form={form}>
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
    </Modal>)
}
export default observer(TimeslotUpdate)