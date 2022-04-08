import React, { useState , useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {useSelector , useDispatch} from 'react-redux'
import { register , reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'


function Register() {
    

    const [formData , setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const navigate = useNavigate()

    const {name , email , password, password2} = formData

    const dispatch = useDispatch()

    const {user, isLoading , isSuccess ,isError, message} = useSelector((state) =>(state.auth))

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            navigate('/')
        }

        dispatch(reset())

    }, [user, isSuccess ,isError, message, navigate , dispatch])

    const onChange =(e)=>{
       setFormData((prevState)=>({
           ...prevState,
           [e.target.name] : e.target.value         //[] sets according to the field that is changed 
       }))  
    }

    const onSubmit =(e)=>{
        e.preventDefault()

        if(password!==password2)
        {
            toast.error("Passwords do not match")
        }
        else{
            const userData = {
                name , email , password
            }

            dispatch(register(userData))
        }
    }


  return (
      <>
    <section className='heading' >
        <h1>
            <FaUser/> Register
        </h1>
        <p>Please create an account</p>

    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                type="text"
                className='form-control'
                id='name'
                name='name'
                value={name}
                onChange={onChange}
                placeholder="Enter your name"
                required
                ></input>
            </div>
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
                <input
                type="password"
                className='form-control'
                id='password2'
                name='password2'
                value={password2}
                onChange={onChange}
                placeholder="Confirm your Password"
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

export default Register