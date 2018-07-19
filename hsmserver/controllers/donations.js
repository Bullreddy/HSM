import token from '../services/token';
import Donation from '../models/donation';
import * as request from 'request';

export default {
    getStudentList : (req, res, next) => {
		console.log('students...');
      

  Donation
.find({}, function (err, donations) {
    console.log(err)
    if (err) {return res.status(422).send(err);}
    else {
        request.get("http://localhost:8080/student/getallstudents",function(err,response,body){
       
        if(!err){

//donations merge witn student id need to do
            var responseObj=JSON.parse(body);
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
