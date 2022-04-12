const mongoose = require('mongoose')


const ticketSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
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
        type:String,
        required:true,
        enum:['New','Open','Closed'],
        default:false
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Ticket',ticketSchema)