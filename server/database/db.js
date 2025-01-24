import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
      const connectionInstace =  await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected !! DB HOST: ",connectionInstace.connection.host);
        
    } catch (error) {
        console.log("Error Occured" , error);
        process.exit(1);
    }
}

export default connectDB;