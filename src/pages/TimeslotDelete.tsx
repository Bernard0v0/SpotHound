import { Button, message, Popconfirm } from 'antd'
// @ts-ignore
import { Timeslot} from '../model/R.tsx'
import {observer} from "mobx-react-lite";
// @ts-ignore
import TimeslotStore from "../store/TimeslotStore.tsx";


function TimeslotDelete({slot}:{slot:Timeslot}) {
    async function onConfirm() {
        await TimeslotStore.deleteslot(slot)
        message.info(TimeslotStore.message)
    }
    return (
        <Popconfirm title='Are you sure to delete the slot?' onConfirm={onConfirm} okText='Yes' cancelText='No'>
            <Button danger size='small'>
                Delete
            </Button>
        </Popconfirm>
    )
}
export default observer(TimeslotDelete)