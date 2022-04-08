import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user : user ? user :null,
    isError:false,
    isSuccess :false,
    isLoading:false,
    message:''
}



// Regsiter User

export const register = createAsyncThunk('auth/register', async(user,thunkAPI)=>{
    try{

        return await authService.register(user)
    }

    catch(error){

        const message = (error.response && error.response.data&&error.response.data.message||error.message||error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

//Login Users
export const login = createAsyncThunk('auth/login', async(user,thunkAPI)=>{
    console.log(user)
})

export const authSlice = createSlice({
    name:'auth',
    initialState : initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false
            state.isSuccess =false
            state.isLoading =false
            state.message = ''
        }
    },
    extraReducers :(builder)=>{

        builder

        .addCase(register.pending ,(state)=>{         // Responses from register
            state.isLoading=true
            console.log("register pending")
        })

        .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        console.log("register fulfilled")
      })

        .addCase(register.rejected ,(state,action)=>{
            state.isLoading=false
            state.message = action.payload
            state.user = null
            state.isError = true
        })
        
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
