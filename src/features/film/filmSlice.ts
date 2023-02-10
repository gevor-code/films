import {createSlice, Draft} from "@reduxjs/toolkit";
import {getAllData, getDataById, getFeedBack} from "./filmAPI";

const initialState = {
    films:[],
    film:{},
    feedback:{}

}
const filmSlice = createSlice({
    name: "film",
    initialState,
    reducers: {
        getFilm: (state, action) => {
            state.films = action.payload
        },
        deleteFilm:(state,action)=>{
          state.films=state.films.filter((a:any)=>a.id!=action.payload)
        }


    },
    extraReducers: (builder)=> {
    builder.addCase(getAllData.fulfilled, (state:Draft<any>, action)=> {
        state.films = action.payload
    })
        builder.addCase(getDataById.fulfilled,(state:Draft<any>,action)=>{
            state.film=action.payload
        })

        builder.addCase(getFeedBack.fulfilled,(state:Draft<any>,action)=>{
            state.feedback=action.payload
        })

    }
})
export default filmSlice.reducer
export const {getFilm,deleteFilm} = filmSlice.actions
