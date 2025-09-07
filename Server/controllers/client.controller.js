import query from "../models/query.model.js"

export const sendQuery = async (req,res)=>{
    const {name,email,message} = req.body
    
    try {
        const newQuery = new query({
            name,email,message
        })
        await newQuery.save()
        res.status(201).json({
            message:"Query Send Successfully!"
        })
    } catch (error) {
        console.log("Error Sending the Query ",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
}