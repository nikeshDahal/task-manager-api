const express = require('express');
const userRouter = new express.Router();
const User = require("../models/users");
const auth = require('../middlewares/auth');
const multer = require('multer');
const sharp = require('sharp');




//......................create  users...............//
userRouter.post("/users",async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      const tokens = await user.generateAuthToken()
      res.status(200).send({user,tokens});
      // console.log(savedValue)
      // console.log(tokens)
    } catch (error) {
      res.status(400).send(error)
    }
  });

  //.........................login user....................//
  userRouter.post("/users/login", async (req,res)=>{
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const tokens = await user.generateAuthToken();
      res.status(201).send({user,tokens});
    } catch (error) {
      res.status(400).send({
        error:"unable to get users"
      })
    }
  })

  //....................logout user..................//
  userRouter.get("/users/logout", auth, async (req,res)=>{
    try {
      req.user.tokens=req.user.tokens
      .filter((iteratingToken)=>{
        return iteratingToken.token !== req.token 
      })
      await req.user.save()
      res.send({message:"user log out"});
    } catch (error) {
      res.status(400).send();
    }
 
  })

  // .................logout all user................//
  userRouter.get("/users/logoutAll",auth,async(req,res)=>{
    try {
      req.user.tokens=[];
      await req.user.save();
      res.send({
        message:"logged out of all session"
      })
    } catch (error) {
      res.status(400).send({
        message:"error in logging out of all sessions"
      })
      
    }
  })



  //......................read profile................//
userRouter.get("/users/me",auth, async (req,res)=>{
    try {
      res.status(200).send(req.user);

    } catch (error) {
      console.log(error);
    }
  });

// //......................read particular user...............//
// userRouter.get("/users/:id",async (req,res)=>{
//     try {
//       const _id=req.params.id;
//       const foundUser= await User.findById({_id})
//       res.send(foundUser)
//     } catch (error) {
//       res.send(error);  
//     }
//   });

//......................update users.....................//
userRouter.patch('/users/me',auth,async (req,res)=>{
    const allowedUpdates=['name','age','password','email'];
    const updates=Object.keys(req.body);
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
      res.status(400).send({
        error:"invalid updates"
      })
    }
    try {
     
      // console.log(req.body)
      // console.log('user',user);//logging user
      updates.forEach((update)=>req.user[update]=req.body[update]); // for updating fields
      await req.user.save();
      res.status(200).send(req.user);
    } catch (error) {
      res.status(404).send(error);
    }
  })

  //........................deleting user..........................//

userRouter.delete('/users/me',auth,async(req,res)=>{
    try {
      
      // const user = await User.findByIdAndDelete(req.user._id);
      // if(!user){
      //   return res.status(400).send({
      //     error:"user not found"
      //   });
      // }
     
      const user = await req.user.remove();
      res.status(200).send(user);
      
    } catch (error) {
      res.status(400).send({
        error:"error"
      })
    }
  })


  //....................upload avatar.........................//

  const uploads= multer({
    // dest:'destinationAvatar',
    limits:{
      fileSize:1000000
    },
    fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        cb(new Error('please upload photo'))
      }
      cb(undefined,true);
    }

  })

  userRouter.post('/users/me/avatar',auth,uploads.single('avatarKey'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width: 250,height: 250}).png().toBuffer();
    req.user.avatar=buffer;
    await req.user.save()
    res.send()
  },(error,req,res,next)=>{
    if(error){
      res.status(400).send({
        error:error.message
      })
    }

  })



//....................deleting avatar................................//
userRouter.delete('/users/me/avatar',auth,async(req,res)=>{
  try {
    req.user.avatar=undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send({error:"failed in deleting avatar photo"})
    
  }

})

  //......................serving avatar.....................
  userRouter.get('/users/:id/avatar',async(req,res)=>{
    try {
      const user = await User.findById(req.params.id);
      if(!user || !user.avatar){
        throw new Error();
      }
      res.set('Content-Type','image/png');
      res.send(user.avatar)
      
    } catch (error) {
      res.status(404).send()
    }
  })




module.exports=userRouter