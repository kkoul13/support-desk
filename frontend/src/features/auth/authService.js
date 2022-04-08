import axios from'axios'

const API_URL = '/api/user'

//Register User
const register = async(userData)=>{
     const response = await axios.post(API_URL , userData)

     if(response){
         localStorage.setItem('user', JSON.stringify(response.data))
         console.log( "authService" , response)                                                     //  Testingggggggggggggggggggggggggggggg
     }

     return response.data
}

const authService = {
    register
}

export default authService