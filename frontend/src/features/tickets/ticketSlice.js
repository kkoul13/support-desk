import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from './ticketService'

const initialState ={
    ticket:{},
    tickets:[],
    isLoading:false,
    isSuccess: false,
    isError : false,
    message:''
}

export const createTicket = createAsyncThunk('tickets/create', async(ticketData,thunkAPI)=>{
    try{

        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData , token)
        
    }

    catch(error){

       const message = (error.response && error.response.data.message) || error.message
        return thunkAPI.rejectWithValue(message)
       
    }
})

export const ticketSlice = createSlice({
    name:"tickets",
    initialState : initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false
            state.isSuccess =false
            state.isLoading =false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase( createTicket.pending,(state)=>{
            state.isLoading= true
        }

        )
        .addCase( createTicket.fulfilled,(state)=>{
            state.isLoading = false;
            state.isSuccess = true;    
        }

        )
        .addCase( createTicket.rejected,(state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload                         // from createTicket thunkAPI.rejectWithValue(message)
        }

        )
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer
