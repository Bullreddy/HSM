import token from '../services/token';
import Donation from '../models/donation';
import * as request from 'request';
import  autoIncrement  from "mongodb-autoincrement";

export default {

    addDonation:(req, res, next) =>{

   
        const { createdby, studentid, donationamount, createddate,id } = req.body;
    
   
    
    autoIncrement.getNextSequence(Donation.db,Donation.collection.collectionName,function (err, autoIndex) {
        console.log(autoIndex)
        const donation = new Donation({
            donationid:autoIndex,
            createdby: createdby,
            studentid: studentid,
            donationamount:donationamount,
            createddate:createddate
        })

        donation.save(function (err, donations) {
            if (err) {
                return next(err)
            }

            res.json({
                success: true,
                data:donations
            })
        })
    })
       
    },
    updateDonation:(req, res, next) =>{

   console.log(req.body)
        const { createdby, studentid, donationamount, createddate,donationid } = req.body;
        var myquery = { donationid: donationid };
        var newvalues = { $set: {donationamount: donationamount, createdby: createdby,createddate:createddate } };
        
Donation.updateOne(myquery, newvalues, function(err, record) {
    if (err) throw err;
    console.log("1 document updated");
  
    res.json({
        success: true,
        data:record
    })
  });
       
    },
    deleteDonation:(req, res, next) =>{

      //  console.log(req.body)
            
             var myquery = { donationid: req.query.donationid };
            console.log(myquery)
     Donation.remove(myquery, function(err, record) {
         if (err) throw err;
         console.log("1 document deleted");
       
         res.json({
             success: true,
             data:record
         })
       });
            
         },
    getdonationbystudent:(req, res, next) =>{

        Donation
        .find({
            studentid:req.query.id
        }, function (err, donations) {
            
            if (err) {return res.status(422).send(err);}
            else {
                
            res.json({
                success: true,
                data:donations
            })
   
            }
        })
    },
    getStudentList : (req, res, next) => {
		console.log('students...');
      

  Donation
.find({}, function (err, donations) {
    
    if (err) {return res.status(422).send(err);}
    else {
        request.get("http://localhost:8080/SCMServices/student/getallstudents",function(err,response,body){
       
        if(!err){

//donations merge witn student id need to do
var responseObj=JSON.parse(body);

    responseObj.forEach(element => {
        console.log(element);
let donationAmt=0;
        donations.forEach(val =>{
            console.log(val);
            if(val.studentid==element.id){
                donationAmt+=val.donationamount;
        
            }

        })
        element.donationamount=donationAmt;
    });


   
            res.json({
                success: true,
                data:responseObj
            })
          }else{
            res.status(422).send(err);
          }
      //console.log(body)
      
        })
       
}
    })
    

    

      
      
    }
    
    
}
