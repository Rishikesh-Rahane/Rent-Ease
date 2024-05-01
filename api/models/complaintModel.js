import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      email:{
        type:String,
      },
      propertyName:{
        type: String,
      },
      listedBy:{
        type:String,
        
      },
      createdAt:{
        type:Date,
        default:Date.now(),
      }
    }
  );
  
  const Complaint = mongoose.model('Complaint', complaintSchema);
  
  export default Complaint;
  