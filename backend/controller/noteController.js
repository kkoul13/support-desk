const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')


// @desp : Get Notes
// @routes : /api/tickets/:ticketid/notes GET
const getNotes = asyncHandler(async(req,res)=>{

 
    const tickets = await Ticket.findById(req.params.ticketId)

    if(tickets.user.toString()!== req.user.id){
        res.status(401)
        throw new Error("Not authorized to view ticket")
    }

    const notes = await Note.find({ticket:req.params.ticketId})

    res.status(200).json(notes)
})

// @desp : Create Note
// @routes : /api/tickets/:ticketid/notes POST
const addNote = asyncHandler(async(req,res)=>{

 
    const tickets = await Ticket.findById(req.params.ticketId)

    if(tickets.user.toString()!== req.user.id){
        res.status(401)
        throw new Error("Not authorized to view ticket")
    }

    const note = await Note.create({
        text:req.body.text,
        isStaff:false,
        user:req.user.id,
        ticket:req.params.ticketId})

    res.status(200).json(note)
})

module.exports={
    getNotes,addNote
}