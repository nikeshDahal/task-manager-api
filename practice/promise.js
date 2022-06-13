// const add=(a,b)=>{
//     return new Promise((resolve,reject)=>{
//         setInterval(()=>{
//             resolve(a+b);
//         },2000)
//     })
// };

// add(1,2).then((sum)=>{
//     console.log(sum);
//     return add(sum,10);
// }).then((sum2)=>{
//     console.log(sum2)
// }).catch((e)=>{
//     console.log(e)
// })

require('../src/db/mongoose');
const { count } = require('../src/models/users');
const User = require('../src/models/users');

//.................using promise chaining....................
// User.findByIdAndUpdate('6298a455c28c73a5bad48781',{age:23}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:23});
// }).then((resolve)=>{
//     console.log('no of users having age 23 is :',resolve);
// }).catch((e)=>{
//     console.log(e)
// })


//..............using asynv and await .....................
const update =async (id,age)=>{
  const updateted= await User.findByIdAndUpdate(id,{age:age});
 const count = await User.countDocuments({age:age});
 return count;
}
 update('6298a455c28c73a5bad48781',40).then((count)=>{
     console.log('count :',count);
 }).catch((e)=>{
     console.log(e)
 })
    
