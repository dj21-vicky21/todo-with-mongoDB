const ToDoModel = require("../models/todomodel");

const findbyid=async(id)=>{
    return await ToDoModel.findById(id).then(data=>{
        return data
    }).catch(err=>{
        return false
    })
}

module.exports.getToDo = async (req, res) => {
    const todo = await ToDoModel.find();
    res.status(200).send(todo);
}

module.exports.saveToDo =  (req, res) => {
    const { text ,status } = req.body
    
    const date = {
        text:text,
        status: status ? status : false
    }

    ToDoModel
        .create(date)
        .then((data) =>{ 
            console.log("Added Successfully...")
            console.log(data)
            res.status(200).send(data)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message:'something went wrong'})});
}

module.exports.deleteToDo = async  (req, res) => {
    const  id = req.params.id;

    if(id == undefined){
        return  res.status(400).json({message:'something went wrong'})
    }

    const Idcheck = await findbyid(id)//check id is exist not

    if(!Idcheck){
        return res.status(404).json({message:'Id not found'})
    }

    ToDoModel
        .findByIdAndDelete(id)
        .then(() => res.set(201).send("Deleted Successfully..."))
        .catch((err) => {
            console.log(err);
            res.status(400).json({message:'something went wrong'})});
}

module.exports.updateToDo = async (req, res) => {

    const {_id , text ,status } = req.body
    
    if(_id == undefined){
        return  res.status(400).json({message:'something went wrong'})
    }
    
    const Idcheck = await findbyid(_id)//check id is exist not

    if(!Idcheck){
        return res.status(404).json({message:'Id not found'})
    }

    console.log(_id , text ,status )

    ToDoModel
        .findByIdAndUpdate(_id, {...(text && { text }),...(status !== undefined && { status })})
        .then(() => res.set(201).send("Updated Successfully..."))
        .catch((err) => {
            console.log(err);
            res.status(400).json({message:'something went wrong'})});
}