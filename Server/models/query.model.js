import mongoose from 'mongoose'
const querySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const query = mongoose.model('Query',querySchema)
export default query;