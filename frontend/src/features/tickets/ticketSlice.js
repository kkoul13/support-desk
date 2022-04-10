import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState ={
    ticket:{},
    tickets:[],
    isLoading:false,
    isSuccess: false,
    isError : false,
    message:''
}

export const ticketSlice = createSlice({
    name:"ticket",
    initialState : initialState,
    reducers:{
        resetTickets:(state)=>{
            state.isError=false
            state.isSuccess =false
            state.isLoading =false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{

    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer
