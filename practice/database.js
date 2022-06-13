// const mongodb=require('mongodb');
// const MongoClient = mongodb.MongoClient;
const {ObjectId,MongoClient}=require('mongodb');

const connectionUrl= 'mongodb://127.0.0.1:27017';
const databaseName='task-manager';

MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log("unable to connect to database");
    }
    console.log('connection sucessful');
    const db=client.db(databaseName);
    //................................to insert one data..................//

    // db.collection('users').insertOne({
    //     name:'nikesh',
    //     age:'23'
    // })

    //...................................for many entries..................//
    // const id= new ObjectId();
    // console.log(id);
    // console.log(id.toHexString());
    // console.log(id.getTimestamp());
    // console.log(id.id);


    //..................insert one........................//
    // db.collection('test2').insertOne({
    //     name:'hari',
    //     age:40
    // })


    //.........................insert many.......................//
    // db.collection('tasks').insertMany([
    //     {
    //         description:'vanilla js courses to complete',
    //         status:'true'
    //     },
    //     {
    //         description:'node js courses to complete',
    //         status:'false'
    //     },
    //     {
    //         description:'mongoDB course',
    //         status:'false'

    //     }
    // ],(error,result)=>{
    //     if(error){
    //         console.log(error);
    //     }
    //     console.log('result',result);
    // })

    //..................................to read one element only...................//

    // db.collection("tasks").findOne(
    //   { _id: new ObjectId("62983f9fdaa3a38f94dec585") },
    //   (error, result) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('findone :',result);
    //     }
    //   }
    // );

    //..................................to read multiple doccuments.................//

    // db.collection("tasks").find({status:'false'}).toArray((error,result)=>{
    //     if(error){
    //         console.log(error);
    //     }
    //     console.log('fina all',result);
    // })


    


    //..................to update only one doccument................
//    const myPromise =db.collection('users').updateOne({_id:new ObjectId("62975008f0efd3400735595c")},{
//        $set:{
//            name:'meghraj'
//        }
//    });
//    myPromise.then((resolvedValue)=>{
//        console.log('resolved value :',resolvedValue);

//    }).catch((rejectedValue)=>{
//        console.log('rejected value',rejectedValue);
//    })


//.............to update many doccumets...............

//    const myPromise =db.collection('tasks').updateMany({status:'false'},{
//        $set:{
//            status:'true'
//        }
//    });
//    myPromise.then((resolvedValue)=>{
//        console.log('resolved value :',resolvedValue);

//    }).catch((rejectedValue)=>{
//        console.log('rejected value',rejectedValue);
//    })

//..................to delete many doccuments...................

    //   const myPromise =db.collection('test2').deleteMany({age:40});
    //     myPromise.then((resolvedValue)=>{
    //         console.log('resolved value :',resolvedValue);

    //     }).catch((rejectedValue)=>{
    //         console.log('rejected value',rejectedValue);
    //     })


//................to delete only one doccment

        const myPromise =db.collection('test').deleteOne({age:23});
        myPromise.then((resolvedValue)=>{
            console.log('resolved value :',resolvedValue);

        }).catch((rejectedValue)=>{
            console.log('rejected value',rejectedValue);
        })



})
