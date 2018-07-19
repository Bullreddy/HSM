import mongoose from 'mongoose';


// Define the model
const DonationSchema = new mongoose.Schema({
   
    id: {
        type: String,
        unique: true,
        lowercase: true
    }, name: {
        type: String,
        lowercase: true
    },
    studentId:{
        type: String,
        lowercase: true
    }
    
})



// Export the model
export default mongoose.model('Donation', DonationSchema);