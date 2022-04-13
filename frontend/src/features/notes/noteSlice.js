import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from './noteService'


const initialState ={
    notes:[],
    isLoading:false,
    isSuccess: false,
    isError : false,
    message:''
}

export const getNotes = createAsyncThunk('notes/getNotes', async( ticketId,thunkAPI)=>{
    try{

        const token = thunkAPI.getState().auth.user.token
        return await noteService.getNotes( ticketId , token)
        
    }

    catch(error){

       const message = (error.response && error.response.data.message) || error.message
        return thunkAPI.rejectWithValue(message)
       
    }
})

export const createNote = createAsyncThunk('notes/createNote', async( {noteText ,ticketId},thunkAPI)=>{
    try{

        const token = thunkAPI.getState().auth.user.token
        return await noteService.createNote( noteText , ticketId , token)
        
    }

    catch(error){

       const message = (error.response && error.response.data.message) || error.message
        return thunkAPI.rejectWithValue(message)
       
    }
})

export const noteSlice = createSlice({
    name:"note",
    initialState : initialState,
    reducers:{
        reset:()=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase( getNotes.pending,(state)=>{
            state.isLoading= true
        }

        )
        .addCase( getNotes.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true; 
            state.notes = action.payload;  
           
        }

        )
        .addCase( getNotes.rejected,(state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload                        
        }
        )

        .addCase( createNote.pending,(state)=>{
            state.isLoading= true
        }

        )
        .addCase( createNote.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true; 
            state.notes.push(action.payload)  ;  
           
        }

        )
        .addCase( createNote.rejected,(state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload                        
        }
        )
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer