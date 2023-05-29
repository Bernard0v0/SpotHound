import {observer} from "mobx-react-lite";
import {Button, message, Popconfirm} from "antd";
// @ts-ignore
import BookingStore from "../store/BookingStore.tsx";
// @ts-ignore
// @ts-ignore
import {Booking} from "../models/R.tsx";


function CBDelete({booking}:{booking:Booking}){
    async function onConfirm() {
        await BookingStore.deletebooking(booking)
        message.info(BookingStore.message)
    }
    return (
        <Popconfirm title='Are you sure to cancel the booking?' onConfirm={onConfirm} okText='Yes' cancelText='No'>
            <Button danger size='small'>
                Cancel
            </Button>
        </Popconfirm>
    )
}
export default observer(CBDelete)