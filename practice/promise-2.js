require('../src/db/mongoose');
const User = require('../src/models/tasks');

// User.findByIdAndRemove('6298a4243a87da629367e8ed').then((removedTask)=>{
//     console.log(removedTask);
//     return User.find({status : true})
// }).then((resolvedValue)=>{
//     console.log('resolved value : ', resolvedValue)
// }).catch((e)=>{
//     console.log(e)
// })

//........................using async and await ........................//
const deleteFuncandCount=async(id,status)=>{
    const deletedTask = await User.findByIdAndRemove(id);
    const count = await User.countDocuments({status:status})
    return count;
}
deleteFuncandCount('6298a27c81aa5885985bf42a',true).then((count)=>{
    console.log('countt :',count)
}).catch((e)=>{
    console.log(e)
})