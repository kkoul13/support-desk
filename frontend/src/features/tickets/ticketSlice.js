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


export const getTickets = createAsyncThunk('tickets/getAll', async(_ ,thunkAPI)=>{
    try{

        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets( token)
        
    }

    catch(error){

       const message = (error.response && error.response.data.message) || error.message
        return thunkAPI.rejectWithValue(message)
       
    }
})

export const getTicket = createAsyncThunk('tickets/getTicket', async( ticketId,thunkAPI)=>{
    try{

        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTicket( ticketId , token)
        
    }

    catch(error){

       const message = (error.response && error.response.data.message) || error.message
        return thunkAPI.rejectWithValue(message)
       
    }
})

export const closeTicket = createAsyncThunk('tickets/closeTicket', async( ticketId,thunkAPI)=>{
    try{

        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket( ticketId , token)
        
    }

    catch(error){

       const message = (error.response && error.response.data.message) || error.message
        return thunkAPI.rejectWithValue(message)
       
    }
})

export const reopenTicket = createAsyncThunk('tickets/reopenTicket', async( ticketId,thunkAPI)=>{
    try{

        const token = thunkAPI.getState().auth.user.token
        // console.log("hello")
        return await ticketService.reopenTicket( ticketId , token)
        
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

        .addCase( getTickets.pending,(state)=>{
            state.isLoading= true
        }

        )
        .addCase( getTickets.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true; 
            state.tickets = action.payload;  
            
        }

        )
        .addCase( getTickets.rejected,(state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload                        
        }

        )

        .addCase( getTicket.pending,(state)=>{
            state.isLoading= true
        }

        )
        .addCase( getTicket.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true; 
            state.ticket = action.payload;  
            // console.log(action.payload)
        }

        )
        .addCase( getTicket.rejected,(state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload                        
        }

        )

        .addCase( closeTicket.fulfilled,(state ,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.tickets.map((ticket)=>(
                ticket._id=== action.payload._id ? (ticket.status='Closed') : ticket
            ))                      
        }

        )

        .addCase( reopenTicket.fulfilled,(state ,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.tickets.map((ticket)=>(
                ticket._id=== action.payload._id ? (ticket.status='Open') : ticket
            ))                      
        }

        )
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer
