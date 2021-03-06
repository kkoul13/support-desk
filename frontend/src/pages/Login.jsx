import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector , useDispatch} from 'react-redux'
import { login , reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Login() {

    const [formData , setFormData] = useState({
        
        email:'',
        password:'',
       
    })

  
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { email , password} = formData


    const {user, isLoading , isSuccess , isError , message} = useSelector((state) =>(state.auth))  //auth in store


    const onChange =(e)=>{
       setFormData((prevState)=>({
           ...prevState,
           [e.target.name] : e.target.value
       }))  
    }


    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            navigate('/')
        }

        dispatch(reset())                              // Resetting form data

    }, [user, isSuccess ,isError, message, navigate , dispatch])



    const onSubmit =(e)=>{
        e.preventDefault()

        const userData = {
            email,password
        }
    
        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner/>
    }



  return (
      <>
    <section className='heading' >
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Login for support</p>

    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            
            <div className="form-group">
                <input
                type="email"
                className='form-control'
                id='email'
                name='email'
                value={email}
                onChange={onChange}
                placeholder="Enter your Email"
                required
                ></input>
            </div>
            <div className="form-group">
                <input
                type="password"
                className='form-control'
                id='password'
                name='password'
                value={password}
                onChange={onChange}
                placeholder="Enter your Password"
                required
                ></input>
            </div>
            
            
            <div className="form-group">
                <button className="btn btn-block">
                    Submit
                </button>
            </div>

        </form>

    </section>

    </>
  )
}

export default Login