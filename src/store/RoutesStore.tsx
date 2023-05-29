import { ItemType } from 'antd/lib/menu/hooks/useItems'
import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { Link, Navigate, RouteObject } from 'react-router-dom'
// @ts-ignore
import {LoginReq, Menu, R, Route,} from '../models/R.tsx'
// @ts-ignore
import { load } from '../router/MyRouter.tsx'
// @ts-ignore
import React from "react";
// @ts-ignore
import ParkingspotStore from "./ParkingspotStore.tsx";
// @ts-ignore
import TimeslotStore from "./TimeslotStore.tsx";
// @ts-ignore
import SearchStore from "./SearchStore.tsx";
// @ts-ignore
import BookingStore from "./BookingStore.tsx";

function convertMenu(m: Menu): ItemType {
    const Label = m.routePath ? <Link to={m.routePath}>{m.label}</Link> : m.label
    return {
        key: m.key,
        label: Label,
        children: m.children && m.children.map(convertMenu),
    }
}

class RoutesStore {
    dynamicRoutes: Route[] = []
    dynamicMenus_user: Menu[] = []
    dynamicMenus_booking: Menu[] = []
    dynamicMenus_nav: Menu[] = []
    token: string = ''
    state: string = 'pending'
    message: string = ''

    async login(loginReq: LoginReq) {
        this.state = 'pending'
        const formData = new FormData();
        formData.append('user', loginReq.user);
        formData.append('password', loginReq.password);
        const resp1 = await axios.post<R<any>>(
            'http://localhost:8080/api/login',
           formData
        )
        if (resp1.data.code === 1) {
            runInAction(() => {
                this.token = resp1.data.data
                localStorage.setItem('token', this.token)
                this.dynamicMenus_user=[{key:'01',label: 'Booking History', children: [{key:'011',label: 'As Lessor', routePath:'/bookinghistory_lessor'},{key:'012',label: 'As Lease', routePath:'/bookinghistory_lease'}],routePath:null},{ key:'02',label: 'Change Password', routePath:'/changepassword'}]
                this.dynamicMenus_booking=[{ key:'05',label: 'As Lessor', routePath:'/currentbooking_lessor'},{ key:'06',label: 'As Lease', routePath:'/currentbooking_lease'}]
                if(this.username ==='admin'){
                    this.dynamicRoutes=[{ path:'/verification', element:'Verification'},{path:'/user',element:'User'},{path:'/parkingspot',element:'Myparkingspot'},{path:'/findspot',element:'Findparkingspot'},{path:'/timeslot',element:'Timeslot1'},{path:'/currentbooking_lease',element:'CBLease'},{path:'/currentbooking_lessor',element:'CBLessor'},{path:'/bookinghistory_lessor',element:'BHLessor'},{path:'/bookinghistory_lease',element:'BHLease'},{path:'/changepassword',element:'Changepassword'}]
                    this.dynamicMenus_nav=[{ key:'0001',label: 'Find&Book', routePath:'/findspot'},{ key:'0002',label: 'My Spot', routePath:'/parkingspot'},{ key:'0003',label: 'My Booking',children:this.dynamicMenus_booking ,routePath:''},{ key:'0004',label: 'Timeslots', routePath:'/timeslot'},{ key:'0005',label: 'User', children:this.dynamicMenus_user,routePath:'/user'},{ key:'0006',label: 'Verification', routePath:'/verification'}]
                }
                else{
                    this.dynamicRoutes=[{path:'/user',element:'User'},{path:'/parkingspot',element:'Myparkingspot'},{path:'/findspot',element:'Findparkingspot'},{path:'/timeslot',element:'Timeslot1'},{path:'/currentbooking_lease',element:'CBLease'},{path:'/currentbooking_lessor',element:'CBLessor'},{path:'/bookinghistory_lessor',element:'BHLessor'},{path:'/bookinghistory_lease',element:'BHLease'},{path:'/changepassword',element:'Changpassword'}]
                    this.dynamicMenus_nav=[{ key:'0001',label: 'Find&Book', routePath:'/findspot'},{ key:'0002',label: 'My Spot', routePath:'/parkingspot'},{ key:'0003',label: 'My Booking',children:this.dynamicMenus_booking ,routePath:''},{ key:'0004',label: 'Timeslots', routePath:'/timeslot'},{ key:'0005',label: 'User', children:this.dynamicMenus_user,routePath:'/user'}]
                }

                localStorage.setItem('Routes',JSON.stringify(this.dynamicRoutes))
                localStorage.setItem('dynamicMenus_user', JSON.stringify(this.dynamicMenus_user))
                localStorage.setItem('dynamicMenus_booking', JSON.stringify(this.dynamicMenus_booking))
                localStorage.setItem('dynamicMenus_nav', JSON.stringify(this.dynamicMenus_nav))

                this.state = 'done'

            })
        } else {
            runInAction(() => {
                this.message = resp1.data.msg || 'Unknown Error'
                this.state = 'error'
            })
        }
    }
    get username() {
        if(this.token.length === 0) {
            return ''
        }
        const json = atob(this.token.split('.')[1])
        return JSON.parse(json).userName
    }
    get userid(){
        if(this.token.length === 0) {
            return ''
        }
        const json = atob(this.token.split('.')[1])
        return JSON.parse(json).userId
    }

    get navmenus() {
        return this.dynamicMenus_nav.map(convertMenu)
    }

    get routes() {
        const staticRoutes: RouteObject[] = [
            { path: '/', element: load('Main1'), children: [] },
            { path: '/signup', element:load('SignUp')},
            { path: '/login', element: load('Login') },
            { path: '/404', element: load('Page404') },
            { path: '/*', element: <Navigate to={'/404'}></Navigate> }
        ]
        staticRoutes[0].children = this.dynamicRoutes.map((r) => {
            return {
                path: r.path,
                element: load(r.element),
            }
        })
        return staticRoutes
    }


    constructor() {
        makeAutoObservable(this)
        const json = localStorage.getItem('Routes')
        this.dynamicRoutes = json ? JSON.parse(json) : []

        const json1 = localStorage.getItem('dynamicMenus_user')
        this.dynamicMenus_user = json1 ? JSON.parse(json1) : []

        const json2 = localStorage.getItem('dynamicMenus_booking')
        this.dynamicMenus_booking = json2 ? JSON.parse(json2) : []

        const json3 = localStorage.getItem('dynamicMenus_nav')
        this.dynamicMenus_nav = json3 ? JSON.parse(json3) : []
        this.token = localStorage.getItem('token') ?? ''
        this.message = ''
        this.state = 'pending'
    }

    reset() {
        localStorage.removeItem('Routes')
        this.dynamicRoutes = []

        localStorage.removeItem('dynamicMenus_user')
        this.dynamicMenus_user = []

        localStorage.removeItem('dynamicMenus_booking')
        this.dynamicMenus_booking = []

        localStorage.removeItem('dynamicMenus_nav')
        this.dynamicMenus_nav = []
        localStorage.removeItem('token')
        this.token = ''

        this.message = ''
        this.state = 'pending'
        ParkingspotStore.parkingspots=[]
        ParkingspotStore.message=''
        ParkingspotStore.parkingspot={spotId:0,userId:0,address:'',latitude:0,longitude:0,imageUrl:'',description:'',spotType:'Normal',createdTime:'',lastUpdateTime:'',isVerified:0,isValid:0,}
        ParkingspotStore.open_create=false
        ParkingspotStore.open_update=false
        ParkingspotStore.spotid=ParkingspotStore.spotlist[0]
        ParkingspotStore.verifparkingspots=[]
        TimeslotStore.timeslots=[]
        TimeslotStore.timeslot={timeSlotId:0,spotId:0,startTime:'',endTime:'',pricePerQuarter:0}
        TimeslotStore.message=''
        TimeslotStore.open_update=false
        TimeslotStore.open_create=false
        TimeslotStore.option=[{label:'',value:0}]
        SearchStore.message=''
        SearchStore.searchresult=[]
        SearchStore.showstate=false
        SearchStore.ordertype='distance'
        SearchStore.startTime=''
        SearchStore.endTime=''
        SearchStore.searchbarstate=true
        SearchStore.loading=true
        BookingStore.message=''
        BookingStore.refNr=0
        BookingStore.bookings=[]
        BookingStore.resshowstate=false
    }
}

export default new RoutesStore()