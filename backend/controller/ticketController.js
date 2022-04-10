const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desp : Get Tickets
// @routes : /api/tickets
const getTickets = asyncHandler(async(req,res)=>{

    // console.log(req.user.id)
    // console.log(req.user._id)
    // const user = await Users.findById(req.)
    const tickets = await Ticket.findOne({user:req.user.id})
    res.status(200).json(tickets)
})

// @desp : Create Tickets
// @routes : /api/tickets
const createTickets = asyncHandler(async(req,res)=>{

    const {product , description} = req.body

    if(!product || !description){
        return new Error("Enter both product and description")
    }

    const ticket = await Ticket.create({
        product,
        description,
        user : req.user.id,
        status:'new'
    })

    res.status(201).json(ticket)
})

module.exports ={
    getTickets , createTickets
}