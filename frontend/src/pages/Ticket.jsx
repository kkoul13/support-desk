import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { closeTicket, getTicket , reopenTicket } from "../features/tickets/ticketSlice"



function Ticket() {

    const {ticket , isLoading , isSuccess , isError , message} = useSelector((state)=>state.tickets)
    const dispatch = useDispatch()
    const params = useParams()
    const {ticketId} = useParams()
    const navigate = useNavigate()
    const [value, setValue] = useState(0);
    

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        //eslint-disable-next-line
    } , [ticketId , message , isError,value ])

    if(isLoading)return (<Spinner/>)
    if(isError) return <h1>Something went wrong</h1>

    const onCloseTicket=()=>{
        dispatch(closeTicket(ticketId))
        setTimeout(()=>{
            setValue(value => value + 1)
            toast.success("Ticket Closed")
        } , 500)
        
       
    }

    const onReopenTicket=()=>{
        
        dispatch(reopenTicket(ticketId))
        
        setTimeout(()=>{
            setValue(value => value + 1)
            toast.success("Ticket Reopened")
        } , 500)
                      
    }
    

  return (
    <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url='/tickets'/>
            <h2>
                Ticket ID : {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
            </h2>
            <h3>
               Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-IN')} 
            </h3>
            <h3>Product : {ticket.product}</h3>
            <hr/>
            <div className="ticket-desc">
                <h3>Ticket Description</h3>
                <p>{ticket.description}</p>
            </div>
        </header>

        {ticket.status!=='Closed' && <button onClick={onCloseTicket} className="btn btn-block btn-danger">Close Ticket</button> }
        {ticket.status ==='Closed' && <button onClick={onReopenTicket} className="btn btn-block">Reopen Ticket</button> }
    </div>
  )
}

export default Ticket