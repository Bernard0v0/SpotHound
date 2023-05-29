// @ts-ignore
import {Booking, R} from "../models/R.tsx";
import axios from "axios";
import {makeAutoObservable, runInAction} from "mobx";
// @ts-ignore


class BookingStore{
    bookings:Booking[]=[]
    message:string=''
    resshowstate:boolean=false
    refNr:number=0

    async createbooking(booking:Booking){
        const resp = await  axios.post<R<number>>('http://localhost:8080/api/booking',booking)
        runInAction(()=>{
            this.message=resp.data.msg
            this.refNr=resp.data.data
        })
    }
    async getCBLease(userid:number){
        const resp = await  axios.get<R<Booking[]>>(`http://localhost:8080/api/leasebooking_current/${userid}`)
        runInAction(()=>{
            this.bookings=resp.data.data
            this.message=resp.data.msg
        })
    }
    async getCBLessor(userid:number){
        const resp = await  axios.get<R<Booking[]>>(`http://localhost:8080/api/lessorbooking_current/${userid}`)
        runInAction(()=>{
            this.bookings=resp.data.data
            this.message=resp.data.msg
        })
    }
    async getBHLessor(userid:number){
        const resp = await  axios.get<R<Booking[]>>(`http://localhost:8080/api/lessorbooking_history/${userid}`)
        runInAction(()=>{
            this.bookings=resp.data.data
            this.message=resp.data.msg
        })
    }
    async getBHLease(userid:number){
        const resp = await  axios.get<R<Booking[]>>(`http://localhost:8080/api/leasebooking_history/${userid}`)
        runInAction(()=>{
            this.bookings=resp.data.data
            this.message=resp.data.msg
        })
    }
    async deletebooking(booking:Booking){
        const resp = await  axios.delete<R<null>>(`http://localhost:8080/api/booking/${booking.referenceId}`)
        runInAction(()=>{
            this.message=resp.data.msg
            this.getCBLease(booking.leaseId)
        })
    }
    constructor() {
        makeAutoObservable(this)
    }
}
export default new BookingStore()