import {createAsyncThunk} from "@reduxjs/toolkit";
import {EnumFirestore} from "../../types/type";
import {updateData} from "../../firebase/fetchFirebase";


export const getData = createAsyncThunk(
    'get/user',
    async () => {

    }
)
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({id, collectionName,obj}: { id: string, collectionName: EnumFirestore,obj:any }) => {
    const data=await updateData({collectionName,id,obj}).then((r)=>{
        return r
    }).catch((er)=> {
    })
        return data
    }
)