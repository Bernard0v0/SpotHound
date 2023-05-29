import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
// @ts-ignore
import {ParkingSpot, R} from "../models/R.tsx";
import{message} from "antd";
// @ts-ignore


export function verifiedstate(state:number){
    return state===1? 'Yes':'No'
}
class ParkingspotStore{
    parkingspots : ParkingSpot[]=[]
    message:string=''
    parkingspot: ParkingSpot={spotId:0,userId:0,address:'',latitude:0,longitude:0,imageUrl:'',description:'',spotType:'Normal',createdTime:'',lastUpdateTime:'',isVerified:0,isValid:0,}
    open_update:boolean=false
    open_create:boolean=false
    verifparkingspots:ParkingSpot[]=[]
    spotid:number=this.spotlist[0]
    async getverifspot(){
        const resp = await  axios.get<R<ParkingSpot>>(`http://localhost:8080/api/verify`)
        runInAction(()=>{
            console.log('verif')
                this.verifparkingspots=resp.data.data
        })
    }
    async validspot(spot:ParkingSpot){
        const resp = await  axios.post<R<null>>(`http://localhost:8080/api/verify_success/${spot.spotId}`)
        runInAction(()=>{
            message.success(resp.data.msg)
            this.getverifspot()
        })
    }
    async invalidspot(spot:ParkingSpot){
        const resp = await  axios.put<R<null>>(`http://localhost:8080/api/verify_fail/${spot.spotId}`)
        runInAction(()=>{
            message.success(resp.data.msg)
            this.getverifspot()
        })
    }

    async viewspot(userid:number){
        const resp = await  axios.get<R<ParkingSpot[]>>(`http://localhost:8080/api/parkingspot/${userid}`)
        runInAction(()=>{
            this.parkingspots=resp.data.data
            this.spotid=this.spotid||this.spotlist[0]
            if(this.parkingspots!=null){
            this.parkingspots.map((spot:ParkingSpot)=>{
                spot.isVerified=verifiedstate(spot.isVerified)
                spot.isValid=verifiedstate(spot.isValid)

            })}
        })
    }
    async editspot(spot:ParkingSpot){
        const resp = await  axios.put<R<null>>(`http://localhost:8080/api/parkingspot`,spot)
        runInAction(()=>{
            this.message=resp.data.msg
            this.viewspot(spot.userId)
        })
    }
    async deletespot(spot:ParkingSpot){
        const resp = await  axios.delete<R<null>>(`http://localhost:8080/api/parkingspot/${spot.spotId}`)
        runInAction(()=>{
            this.message=resp.data.msg
            this.viewspot(spot.userId)
        })
    }
    async createspot(spot:ParkingSpot){
        const resp = await  axios.post<R<null>>(`http://localhost:8080/api/parkingspot`,spot)
        runInAction(()=>{
            this.message=resp.data.msg
            this.viewspot(spot.userId)
        })
    }
    constructor() {
        makeAutoObservable(this)
    }
    get spotlist(){
        const spotlist:number[]=[]
        this.parkingspots.map((spot:ParkingSpot)=>{
            spotlist.push(spot.spotId)
        })
        return spotlist
    }
}
export default new ParkingspotStore()