import mongoose from 'mongoose';


// Define the model
const DonationSchema = new mongoose.Schema({
    donationid:{
        unique: true,
        type:Number
    },
    createdby: String,
    studentid:Number,
    donationamount:Number,
    createddate:Date
    
})



// Export the model
export default mongoose.model('Donation', DonationSchema);