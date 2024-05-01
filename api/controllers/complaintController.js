import Complaint from "../models/complaintModel.js";

export const createComplaint = async (req, res, next) => {
    const {name, description, propertyName, listedBy } = req.body;

    const newComplaint = new Complaint({ name,description,propertyName,listedBy });
    try {
      await newComplaint.save();
      res.status(201).json('Complaint created successfully!');
    } catch (error) {
      next(error);
    }
  };

  export const getComplaint = async (req, res, next) => {
    try {
       const complaints = await Complaint.find({});
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  };

  export const deleteComplaint = async (req, res, next) => {
    const complaint = await Complaint.findById(req.params.id);
  
    if (!complaint) {
      return next(errorHandler(404, 'Complaint not found!'));
    }
  
    // // If the user is not an admin, check ownership
    // if (req.user.id !== listing.userRef) {
    //   return next(errorHandler(401, 'You can only delete your own listings!'));
    // }
  
    try {
      await Complaint.findByIdAndDelete(req.params.id);
      res.status(200).json('Complaint has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  
  export const getComplaintSingle = async (req, res, next) => {
    try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) {
        return next(errorHandler(404, 'Complaint not found!'));
      }
      res.status(200).json(complaint);
    } catch (error) {
      next(error);
    }
  };