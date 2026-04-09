import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String ,
        required:[true,"Please provide your name"],
        trim: true
    },
    email: {
        type: String ,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"],
        trim: true,
        index: true
    },
    password: {
        type: String , 
        required:[true, "Please provide your password"],
        select: false
    }, 
    avatar: {
        type: String, 
        default: ""

    },
    mobile: { 
       type: String,
       default: null
       
    },
     role: {
        type: String,
        enum: ["ADMIN" ,"USER","SUPPORT"],  
        default: "USER",
        index: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active",
        index: true
    },
    is_email_verified: { 
        type : Boolean, 
        default:false  
    },
    verifyTokenEmail: { 
        type : String, 
        select : false,
        default : "" 
    },
    last_login_date: {
        type : Date ,
        default: null , 
    }, 
    address_details: [
        {
            type:  mongoose.Schema.ObjectId,
            ref : 'Address'
        }
    ],
    subscription_details: {
        type : mongoose.Schema.ObjectId,
        ref : "Subscription"
    },
   /*  orderHistory :[
        {
            type : mongoose.Schema.ObjectId,
            ref : "order"
        }
    ], */
    refresh_token: {
          type : String ,
          select: false,
    },
    reset_password_token: {
        type: String,
        default: "" 

    },
    reset_password_expiry: {
        type: Date,
    },
    current_lat: {
        type: Number,
        default: null
    },
    current_long: {
        type: Number,
        default: null,
    },
    location_updated_at: {
        type: Date,
        default: null
    }
   
},{
  timestamps: true
});

const UserModel = mongoose.model("user",UserSchema);
export default UserModel;

