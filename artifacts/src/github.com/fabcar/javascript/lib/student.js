'use strict';

const { Contract} = require('fabric-contract-api');

class Student extends Contract {

  async initLedger(ctx) {
    console.info('============= START : Initialize Ledger ===========');    
    
    const students = [
        {
            studentId:'1',
            subj1: '50',
            subj2: '60',
            subj3: '87',
        },
        {
          studentId:'2',
          subj1: '40',
          subj2: '60',
          subj3: '87',
        },
        {
          studentId:'3',
          subj1: '96',
          subj2: '60',
          subj3: '87',
        },
        {
          studentId:'4',
          subj1: '50',
          subj2: '60',
          subj3: '87',
        },
        {
          studentId:'5',
          subj1: '70',
          subj2: '60',
          subj3: '87',
        },
        {
          studentId:'6',
          subj1: '40',
          subj2: '80',
          subj3: '27',
        },
        {
          studentId:'7',
          subj1: '40',
          subj2: '90',
          subj3: '37',
        },
        {
          studentId:'8',
          subj1: '30',
          subj2: '70',
          subj3: '97',
        },
        {
          studentId:'9',
          subj1: '60',
          subj2: '60',
          subj3: '57',
        },
        {
          studentId:'10',
          subj1: '40',
          subj2: '90',
          subj3: '77',
      },
    ];

    for (let i = 0; i < students.length; i++) {
      studentId = students[i].studentId;
      await ctx.stub.putState(studentId,Buffer.from(JSON.stringify(marks))); 
        //await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
        console.info('Added <--> ', students[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
} 

async queryCar(ctx, studentId) {
  //const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
  let marksAsBytes = await ctx.stub.getState(studentId); 
  if (!marksAsBytes || marksAsBytes.toString().length <= 0) {

    //throw new Error('Student with this Id does not exist: ');
    throw new Error(`${studentId} does not exist`); 
    }
  
  
  console.log(marksAsBytes.toString());
  let marks=JSON.parse(marksAsBytes.toString());
  return JSON.stringify(marks);
  //return carAsBytes.toString();
}
async createCar(ctx, studentId,subject1,subject2,subject3) {
  console.info('============= START : Create Student Marks  ===========');

  let marks={

    subj1:subject1,

    subj2:subject2,

    subj3:subject3

  };

 await ctx.stub.putState(studentId,Buffer.from(JSON.stringify(marks))); 

 console.log('Student Marks added To the ledger Succesfully..');

  console.info('============= END : Create Car ===========');
}

async queryMarks(ctx,studentId) {

    let marksAsBytes = await ctx.stub.getState(studentId); 

    if (!marksAsBytes || marksAsBytes.toString().length <= 0) {

      throw new Error('Student with this Id does not exist: ');

       }

      let marks=JSON.parse(marksAsBytes.toString());
      return JSON.stringify(marks);

  }

async addMarks(ctx,studentId,subject1,subject2,subject3) {
   
   let marks={

       subj1:subject1,

       subj2:subject2,

       subj3:subject3

       };

    await ctx.stub.putState(studentId,Buffer.from(JSON.stringify(marks))); 

    console.log('Student Marks added To the ledger Succesfully..');
    
  }

async deleteMarks(ctx,studentId) {
   
    await ctx.stub.deleteState(studentId); 
    console.log('Student Marks deleted from the ledger Succesfully..');

    }

   
}

module.exports=Student;
