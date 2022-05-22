import asyncHandler from "express-async-handler";
import Questions from "../models/questionsModel.js";



//=========add question =======//

const addQuestion=asyncHandler(async(req,res)=>{

    // console.log('here');

    // console.log(req.body);

    const {question,option1,option2,option3,option4}=req.body;

    const questions=await Questions.create({
        question:question,
        option1:option1,
        option2:option2,
        option3:option3,
        option4:option4
    })
    if(questions){
        res.status(201).json({
            questions
        })
    }else{
        res.status(400)
        throw new Error("new Error")
    }

})


//========all question ========//

const allQuestions=asyncHandler(async(req,res)=>{
    const questions=await Questions.find({})
    res.json(questions)
})


//====delete question =====//

const deleteQuestion=asyncHandler(async(req,res)=>{
    const question=await Questions.findById(req.params.id)
    
    if(question){
       await question.remove()
        res.status(201).json({
            success:"success"
        })
    }else{
        throw new Error("new Error")
        res.status(400)
    }
})




export {addQuestion,allQuestions,deleteQuestion}