const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desp : Get Tickets
// @routes : /api/tickets
const getTickets = asyncHandler(async(req,res)=>{

    res.status(200).json({message : 'Get Tickets'})
})

// @desp : Create Tickets
// @routes : /api/tickets
const createTickets = asyncHandler(async(req,res)=>{

    res.status(200).json({message : 'Create Tickets'})
})

module.exports ={
    getTickets , createTickets
}