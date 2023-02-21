import {createAsyncThunk} from "@reduxjs/toolkit";
import {addData, deleteFilm, getData, getFb, getItem} from "../../firebase/fetchFirebase";
import {TypeFirestore} from "../../types/type";



export const getAllData=createAsyncThunk(
    'get/film',
    async ({collectionName}: TypeFirestore)=>{
        const data = await  getData({collectionName}).then((r)=> {
            return r
        })
        return data
    }
)
export const delFilm =  createAsyncThunk(
    'del/film',
    async  ({collectionName, id}: TypeFirestore) => {
        const data = await  deleteFilm({collectionName, id}).then((r)=>{
          return r
        }).catch((er)=> {
            return er
        })
        return data
    }
)


export const getDataById=createAsyncThunk(
    'get/filmId',
    async({collectionName,id}:TypeFirestore)=>{
        const data= await getItem({collectionName,id}).then((r)=>{
            return r
        })
        return data
    }
)


export const getFeedBack=createAsyncThunk(
    'get/feedback',
    async ({collectionName,id}:any)=>{
        const data=await getFb({collectionName,id}).then((r)=>{
            return r
        })
        return data
    }
)


export  const addNewData = createAsyncThunk(
    'add/feedback',
    async ({collectionName, obj}:TypeFirestore)=>{
        const  data = await addData({collectionName, obj}).then((r)=>{
            return r
        }).catch((er)=> {
        })
        return data
    }
)
