//callbacks

const mainFunc=(callbacks)=>{
    setInterval(()=>{
        console.log('setinterval...');
        callbacks(undefined,[1,2,7]);
        

    },2000)

};

mainFunc((error,result)=>{
    if(error){
        console.log(error);

    }else{
        console.log(result);
    }

});


//promises

const myPromise= new Promise((resolve,reject)=>{
    console.log('entring in to promise body...');
    resolve([1,2,3,4,5]);
    reject('rejected !!');

});
myPromise.then((resolvedValue)=>{
    console.log(resolvedValue);
}).catch((rejectedValue)=>{
    console.log('error : ',rejectedValue)
})