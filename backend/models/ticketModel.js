const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    product:{
        type:String,
        required:[true,'Please choose a product'],
        enum:['Phone' , 'Laptop' , 'Tablet' , 'Others'],
        
    },

    description:{
        type:String,
        required:[true,'Please enter description for issue']
    },

    status:{
        type:Boolean,
        required:true,
        enum:['new','open','closed'],
        default:false
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Ticket',ticketSchema)