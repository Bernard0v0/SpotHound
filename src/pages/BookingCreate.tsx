
import {Button, Popconfirm} from "antd";
import {observer} from "mobx-react-lite";
import {Booking, SearchResult} from "../models/R";
// @ts-ignore
import SearchStore from "../store/SearchStore.tsx";
// @ts-ignore
import BookingStore from "../store/BookingStore.tsx";
// @ts-ignore
import RoutesStore from "../store/RoutesStore.tsx";

function BookingCreate({res}:{res:SearchResult}) {
    async function onConfirm() {
        const booking:Booking={referenceId:null,spotId:res.spotId,spotAddress:res.address,lessorId:res.userId,leaseId:RoutesStore.userid,startTime:SearchStore.startTime,endTime:SearchStore.endTime,totalPrice:res.totalPrice,createTime:null}
        await BookingStore.createbooking(booking)
        SearchStore.showstate=false
        BookingStore.resshowstate=true
        SearchStore.searchbarstate=false
    }
    return (
        <Popconfirm title='Are you sure to book the spot?' onConfirm={onConfirm} okText="Yes" cancelText='No'>
            <Button type='primary' size='large' style={{background:'#f1c40f',color:"#36454F"}}>
                Book
            </Button>
        </Popconfirm>
    )
}
export default observer(BookingCreate)