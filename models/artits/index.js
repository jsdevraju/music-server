import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true
    },
    instagramLink:{
        type:String,
    },
    linkedinLink:{
        type:String,
    },
}, { timestamps: true });

export default mongoose.model("artist", artistSchema);
