import asyncHandler from "express-async-handler";
import Questions from "../models/questionsModel.js";



//=========add question =======//

const addQuestion=asyncHandler(async(req,res)=>{

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
        throw new Error("something went wrong")
    }

})


//========all question ========//

const allQuestions=asyncHandler(async(req,res)=>{
    const questions=await Questions.find({})

    if(questions){
        res.status(200).json(questions)
    }else{
        res.status(400)
        throw new Error('Questions not found')
    }
})


//=========delete question ========//

const deleteQuestion=asyncHandler(async(req,res)=>{
    const question=await Questions.findById(req.params.id)

    if(question){
       await question.remove()
        res.status(201).json({
            success:"success"
        })
    }else{
        res.status(400)
        throw new Error("new Error")
    }
})



//================edit questioin====================//


const editQuestion=asyncHandler(async(req,res)=>{
   
    const Editquestion=await Questions.findById(req.params.id)

    const {question,option1,option2,option3,option4}=req.body;

    if(Editquestion){
        Editquestion.question=question;
        Editquestion.option1=option1;
        Editquestion.option2=option2;
        Editquestion.option3=option3;
        Editquestion.option4=option4;
    }else{
        res.status(400)
        throw new Error('question not found')
    }

    Editquestion.save()
    res.status(200).json({
        message:"Question Edited",
        success:true
    })

})



export {addQuestion,allQuestions,deleteQuestion,editQuestion}