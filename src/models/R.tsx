
export interface R<T>{
    code:number,
    msg: string,
    data?:T
}
export interface User{
    userId:number,
    userName:string,
    password:string,
    email:string
}
export interface ParkingSpot{
    spotId:number,
    userId:number,
    address:string,
    latitude:number,
    longitude:number,
    imageUrl:string
    description:string,
    spotType:string,
    createdTime:string,
    lastUpdateTime:string,
    isVerified:number|string,
    isValid:number|string
}
export interface Booking{
    referenceId:number,
    spotId:number,
    spotAddress:string,
    lessorId:number,
    leaseId:number,
    startTime:string,
    endTime:string,
    totalPrice:number,
    createTime:string
}
export interface Timeslot{
    timeSlotId:number,
    spotId:number,
    startTime:string,
    endTime:string,
    pricePerQuarter:number
}
export interface SearchResult{
    spotId:number,
    userId:number,
    address:string,
    imageUrl:string,
    description:string,
    spotType:string,
    distance:number,
    totalPrice:number
}
export interface LoginReq {
    user: string,
    password: string
}

export interface Route {
    path: string,
    element: string
}

export interface Menu {
    key: string,
    label: string,
    children?: Menu[],
    routePath: string
}
export interface ChangePassword{
    userName:string,
    formerPassword:string,
    newPassword:string
}