import mongoose from "mongoose";

const dbConnection = async()=>{
   try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`).
      then(()=>{
        console.log('Connected to DB successfully');
      })
     
   } catch (error) {
    console.log("DB_Error:",error.message)
   }
}

export default dbConnection