const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getTickets , createTickets} = require("../controller/ticketController")



router.route('/').get(protect , getTickets).post(protect , createTickets)

module.exports= router