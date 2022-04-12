const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desp : Get Tickets
// @routes : /api/tickets GET
const getTickets = asyncHandler(async(req,res)=>{

    // console.log(req.user.id)
    // console.log(req.user._id)
    // const user = await Users.findById(req.)
    const tickets = await Ticket.find({user:req.user.id})
    res.status(200).json(tickets)
})

// @desp : Create Tickets
// @routes : /api/tickets POST  
const createTickets = asyncHandler(async(req,res)=>{

    const {product , description} = req.body

    if(!product || !description){
        return new Error("Enter both product and description")
    }

    const ticket = await Ticket.create({
        product,
        description,
        user : req.user.id,
        status:'New'
    })

    res.status(201).json(ticket)
})

// @desp : Get Single Ticket
// @routes : /api/tickets/:id GET
const getTicket = asyncHandler(async(req,res)=>{

    let ticket ;
    try {ticket = await Ticket.findById(req.params.id)}
    catch{ throw new Error('No such ticket found')}
    
    // const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("No such ticket")
    }

    if(ticket.user.toString()!= req.user.id)
    {
        res.status(401)
        throw new Error("Not authorized")
    }
    res.status(200).json(ticket)
})

// @desp : Delete Tickets
// @routes : /api/tickets DELETE
const deleteTicket = asyncHandler(async(req,res)=>{

    
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error("No such ticket")
    }

    if(ticket.user.toString()!= req.user.id)
    {
        res.status(401)
        throw new Error("Not authorized")
    }

    await ticket.remove()

    res.status(200).json({status:true})
})


// @desp : Updates Tickets
// @routes : /api/tickets PUT
const updateTicket = asyncHandler(async(req,res)=>{

    

    const ticket = await Ticket.findById(req.params.id)
    
    if(!ticket){
        res.status(404)
        throw new Error("No such ticket")
    }

    if(ticket.user.toString()!= req.user.id)
    {
        res.status(401)
        throw new Error("Not authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id , req.body)

    res.status(200).json(updatedTicket)
})

module.exports ={
    getTickets , createTickets , getTicket , deleteTicket , updateTicket
}