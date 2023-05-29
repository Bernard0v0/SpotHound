// @ts-ignore
import { R, SearchResult} from "../models/R.tsx";
import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
// @ts-ignore
// @ts-ignore


class SearchStore{
    searchresult:SearchResult[]=[]
    message:string=''
    showstate:boolean=false
    ordertype:string='distance'
    startTime:string=''
    endTime:string=''
    searchbarstate:boolean=true
    loading:boolean=true
    async search(formdata:FormData){
        const resp = await  axios.post<R<SearchResult[]>>(`http://localhost:8080/api/spot/${this.ordertype}`,formdata)
        runInAction(()=>{
            this.message=resp.data.msg
            this.searchresult=resp.data.data
            this.showstate=false
            this.loading=false
        })
    }
    constructor() {
        makeAutoObservable(this)
    }

}
export default new SearchStore()