const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tasks= require('./tasks')
//schema need properties so we passed objects having certain properties in to it.
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        unique:true,
        required : true,
        trim : true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type : String,
        required : true,
        // validate(value){
        //     if(!value.length>6){
        //         throw new Error('password must be greater than length 6');
        //     }
        // },
        minLength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('input text other than password')
            }
        }
    },
    age:{
        type:String,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('age myst be greater than 0');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true,
    
});

// userSchema.virtual('tasks',{
//     ref:'Tasks',
//     localField:'_id',
//     foreignField:'owner'
// })

userSchema.virtual('userTasks',{
    ref:'task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON=function(){
    const user = this
    const userObj = user.toObject();
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    return userObj;
}

userSchema.methods.generateAuthToken=async function() {
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'SECRET_KEY');
    user.tokens = user.tokens.concat({ token })
    user.save();
    return token; 
}

userSchema.statics.findByCredentials = async(email,password)=>{
        const user = await User.findOne({
            email:email
        });
        if(!user){
            throw new Error('user not found !! unable to login')
        }
        const isMatched =await  bcrypt.compare(password,user.password);
        if(!isMatched){
            throw new Error('password not matched')
        }
        return user;  
}

userSchema.pre('save',async function(next){
    console.log('saving.....');
    const user=  this;//gives the user obj which is defined in user schema
    // console.log('user',user)
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);  
    }
    next();
});

userSchema.pre('remove',async function(next){
    const user = this;
   await Tasks.deleteMany({owner:user._id})
    next();
})


const User = mongoose.model('user',userSchema);
module.exports=User;
