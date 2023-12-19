import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required: true,     
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
},{timestamps: true});

const User = mongoose.model('User', userSchema)


userSchema.pre("save",function(next){
   if(!this.isModified("password")) return next()
   this.password = bcryptjs.hashSync(this.password,10)
   next()
})

export default User;