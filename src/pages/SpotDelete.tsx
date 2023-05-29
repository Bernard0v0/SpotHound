import { Button, message, Popconfirm } from 'antd'
// @ts-ignore
import { ParkingSpot} from '../model/R.tsx'
// @ts-ignore
import ParkingspotStore from "../store/ParkingspotStore.tsx";
import {observer} from "mobx-react-lite";

 function SpotDelete({spot}:{spot:ParkingSpot}) {
    async function onConfirm() {
        await ParkingspotStore.deletespot(spot)
        message.success(ParkingspotStore.message)
    }
    return (
        <Popconfirm title='Are you sure to delete the spot?' onConfirm={onConfirm} okText='Yes' cancelText='No'>
            <Button danger size='small'>
                Delete
            </Button>
        </Popconfirm>
    )
}
export default observer(SpotDelete)