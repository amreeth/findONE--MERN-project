import mongoose from "mongoose";

const photosSchema = mongoose.Schema({
  userId: {
    type:String,
  },
  images: [
    {
      publicId:{
        type:String,
      },
      url:{
        type:String,
      }
    }
  ]
});

const Photos = mongoose.model("Photos", photosSchema);

export default Photos;
