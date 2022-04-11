import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { createTicket, reset } from '../features/tickets/ticketSlice'


function NewTicket() {
    const {user} = useSelector((state)=>state.auth)
    const { isLoading , isSuccess , isError , message} =useSelector((state)=>state.tickets)
    const [name ] = useState(user.name)
    const [email ] = useState(user.email)
    const [product , setProduct] = useState('Phone')
    const [description , setDescription] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isError){toast.error(message)}

        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }
    } , [isError , isSuccess , message , dispatch , navigate])


    const onSubmit =(e)=>{
        e.preventDefault()
        dispatch(createTicket({product , description}))
        dispatch(reset())
    }

    if(isLoading) return <Spinner/>

  return (
    <>
    <BackButton url='/'/>
        <section className="heading">
            <h1>Create new ticket</h1>
            <p>Please fill out the form</p>
        </section>
        <section className="form">
            <div className="form-group">
              <label htmlFor="name" >Customer Name</label>
              <input type="text" className="form-control" value={name} disabled />  
            </div>

            <div className="form-group">
              <label htmlFor="email" >Customer Email</label>
              <input type="text" className="form-control" value={email} disabled />  
            </div>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="product" >Product</label>
                    <select name="product" id="product"  value={product} onChange={(e)=>{setProduct(e.target.value)}} >
                        <option value="Phone" >Phone</option>
                        <option value="Laptop" >Laptop</option>
                        <option value="Tablet" >Tablet</option>
                        <option value="Others" >Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description" >Enter Description</label>
                    <textarea name="description" id="description" className="form-control" placeholder="Please Explain Issue" value={description} onChange={(e)=>{setDescription(e.target.value)}} >
                       
                    </textarea>
                </div>
                <div className="form-group test">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>

        </section>
    </>
  )
}

export default NewTicket