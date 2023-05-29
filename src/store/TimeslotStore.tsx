import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
// @ts-ignore
import { R, Timeslot} from "../models/R.tsx";
import{message} from "antd";
// @ts-ignore
import ParkingspotStore from "./ParkingspotStore.tsx";




class TimeslotStore{
    timeslots : Timeslot[]=[]
    message:string=''
    timeslot: Timeslot={timeSlotId:0,spotId:0,startTime:'',endTime:'',pricePerQuarter:0}
    open_update:boolean=false
    open_create:boolean=false
    option:[{label:string,value:number|string}]
    completeslot:[]=[]

    async viewslots(spotid:number){
        if(ParkingspotStore.spotlist!=null){
        const resp = await  axios.get<R<Timeslot[]>>(`http://localhost:8080/api/timeslot/${spotid}`)
        runInAction(()=>{

            this.timeslots=resp.data.data

        })}
        else {
            message.error('No Spot created')
        }
    }
    async editslot(slot:Timeslot[]){
        const resp = await  axios.put<R<null>>(`http://localhost:8080/api/timeslot`,slot)
        runInAction(()=>{
            this.message=resp.data.msg
            this.viewslots(ParkingspotStore.spotid)
        })
    }
    async deleteslot(slot:Timeslot){
        const resp = await  axios.delete<R<null>>(`http://localhost:8080/api/timeslot/${slot.timeSlotId}`)
        runInAction(()=>{
            this.message=resp.data.msg
            this.viewslots(ParkingspotStore.spotid)
        })
    }
    async createslot(slot:Timeslot){
        const resp = await  axios.post<R<null>>(`http://localhost:8080/api/timeslot`,slot)
        runInAction(()=>{
            this.message=resp.data.msg
            this.viewslots(ParkingspotStore.spotid)
        })
    }
    constructor() {
        makeAutoObservable(this)
    }
}
export default new TimeslotStore()