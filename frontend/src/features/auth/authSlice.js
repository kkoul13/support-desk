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

export const register = createAsyncThunk('auth/regist', async(user,thunkAPI)=>{
    try{

        return await authService.register(user)
        
    }

    catch(error){

        // const message = error.response.data.message
        // const message = (error.response && error.response.data&&error.response.data.message||error.message||error.toString())
        // console.log('authslice if error' , error , error.response)
        return thunkAPI.rejectWithValue(error.response.data.message)
        // return message
    }
})

//Login Users
export const login = createAsyncThunk('auth/login', async(user,thunkAPI)=>{
    console.log(user)
})

//Logout User

export const logout = createAsyncThunk('auth/logout', async()=>{
     await authService.logout()
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
            // console.log("register pending")
        })

        .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        console.log(action)
        // console.log("register fulfilled" )
      })

        .addCase(register.rejected ,(state,action)=>{
            state.isLoading=false
            state.message = action.payload
            state.user = null
            state.isError = true
            // console.log('register rejected')
        })

        .addCase(logout.fulfilled , (state)=>{
            state.user = null
        })
        
    }
})

export const {reset } = authSlice.actions
export default authSlice.reducer
