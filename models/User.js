const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    address: {
        type: String, 
        
    },
    phone: {
        type: String, 
        
    },
    city: {
        type: String, 
        
    },
    state: {
        type: String, 
        
    },
    pincode: {
        type: String, 
        
    },
    isAdmin:{
        type: Boolean, 
        default:false,
    }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
