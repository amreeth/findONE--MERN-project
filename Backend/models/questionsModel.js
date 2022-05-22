import mongoose from "mongoose";


const questionSchema=mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    }
})

const Questions=mongoose.model("Question",questionSchema)

export default Questions