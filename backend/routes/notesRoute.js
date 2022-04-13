const express = require('express')
const { getNotes, addNote } = require('../controller/noteController')
const router = express.Router({mergeParams:true})
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect , getNotes)
router.route('/').post(protect , addNote)

module.exports= router
