import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {id:null},

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: () => {

    },
});

export default userSlice.reducer
export const {getUser} = userSlice.actions
