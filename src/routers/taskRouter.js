const express = require('express');
const taskRouter = new express.Router();
const Tasks = require("../models/tasks");
const auth = require("../middlewares/auth");


//......................insert tasks...............//
taskRouter.post("/tasks",auth, async (req, res) => {
    // const task = new Tasks(req.body);
    const task = new Tasks({
      ...req.body,
      owner:req.user._id
    })
    try {
      const savedTask = await task.save();
      res.status(201).send(savedTask);
    } catch (error) {
      res.status(400).send(error)
    }
  });
//GET sortBy=createdAt:desc
//......................read all  tasks of auth user................//
taskRouter.get('/tasks', auth, async (req,res)=>{
  console.log('query:',req.query.status);
  const  match = {};
  const sort={};
  if(req.query.status){
    match.status= req.query.status === 'true'
  }
  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':');
    sort[parts[0]]=parts[1] ==='desc' ? -1 : 1 ;
  }
  console.log(match)//log tha match obj
    try {
      await req.user.populate({
        path:'userTasks',
        match,
        options:{
          limit:parseInt(req.query.limit),
          skip:parseInt(req.query.skip),
          sort
        }
      })
      res.status(200).send(req.user.userTasks);
    } catch (error) {
      res.send(error);
    }
  })

//......................read particular tasks................//
taskRouter.get('/tasks/:id',auth, async (req,res)=>{
    try {
      const _id=req.params.id;
      const foundTask = await Tasks.findOne({
        _id,
        owner:req.user._id
      });
      res.send(foundTask);
    } catch (error) {
      res.send(error)
    }
  })

//........................update tasks.........................//
taskRouter.patch('/tasks/:id',auth,async(req,res)=>{
    const allowedUpdates=['descriptions','status'];
    const updates=Object.keys(req.body);
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
      res.status(400).send({
        error:"invalid updates"
      })
    }
    try {
      const _id = req.params.id;

      const task =await Tasks.findOne({
        _id,
        owner:req.user._id
      });

      updates.forEach((update)=>task[update]=req.body[update]);
      await task.save();
      // const task = await Tasks.findByIdAndUpdate(_id,req.body,{new:true , runValidators:true});
      if(!task){
        return res.status(404).send();
      }
      res.status(200).send(task);
    } catch (error) {
      res.status(400).send({
        error:"error"
      });
    }
  })

//.......................deleting task.....................//
taskRouter.delete('/tasks/:id',auth,async(req,res)=>{
    try {
      
      // const task = await Tasks.findByIdAndDelete(req.params.id);
      const task = await Tasks.findOneAndDelete({
        _id:req.params.id,
        owner : req.user._id
      })
      if(!task){
        return res.status(400).send({
          error:"user not found"
        });
      }
      res.status(200).send(task);
      
    } catch (error) {
      res.status(400).send({
        error:"error"
      })
    }
  })


module.exports=taskRouter