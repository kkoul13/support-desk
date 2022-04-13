const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getTickets , createTickets, getTicket, deleteTicket, updateTicket} = require("../controller/ticketController")


const notesRouter = require('./notesRoute')
router.use('/:ticketId/notes' , notesRouter)
router.route('/').get(protect , getTickets).post(protect , createTickets)
router.route('/:id').get(protect , getTicket).delete(protect , deleteTicket).put(protect , updateTicket) // whenever we use ':id' it takes from params otherwise from body

module.exports= router