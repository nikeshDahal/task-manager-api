// const mongoose = require('mongoose');
// const Tasks = mongoose.model('tasks',{
//     descriptions :{
//         type:String,
//         required : true,
//         trim : true,
//         toLowerCase : true
//     },
//     status:{
//         type:Boolean,
//         default : false,
//     },
//     owner:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'user'
//     }
// })

// module.exports=Tasks;



const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    descriptions :{
        type:String,
        required : true,
        trim : true,
        toLowerCase : true
    },
    status:{
        type:Boolean,
        default : false,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    }
},{
    timestamps:true,
  
})

const Tasks = mongoose.model('task',taskSchema);
module.exports=Tasks;

