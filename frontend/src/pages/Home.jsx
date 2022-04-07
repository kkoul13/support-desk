import React from 'react'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    
    <section className="heading">
        <h1> What do you need help with? </h1>
        <p> Please choose from options</p>
    </section>

    <Link to='/newticket' className="btn btn-reverse btn-block">
        <FaQuestionCircle/> Create new ticket

    </Link>
    

    <Link to='/tickets' className="btn  btn-block">
        <FaTicketAlt/> Check existing ticket

    </Link>

    </>

  )
}

export default Home