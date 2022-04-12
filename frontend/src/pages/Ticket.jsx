import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { getTicket } from "../features/tickets/ticketSlice"


function Ticket() {

    const {ticket , isLoading , isSuccess , isError , message} = useSelector((state)=>state.tickets)
    const dispatch = useDispatch()
    const params = useParams()
    const {ticketId} = useParams()

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        //eslint-disable-next-line
    } , [ticketId , message , isError])

    if(isLoading)return (<Spinner/>)
    if(isError) return <h1>Something went wrong</h1>

  return (
    <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url='/'/>
            <h2>
                Ticket ID : {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
            </h2>
            <h3>
               Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-IN')} 
            </h3>
            <hr/>
            <div className="ticket-desc">
                <h3>Ticket Description</h3>
                <p>{ticket.description}</p>
            </div>
        </header>
    </div>
  )
}

export default Ticket