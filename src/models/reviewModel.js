const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//structure of document
const reviewSchema = new mongoose.Schema(
  {
    bookId: {type:ObjectId, require:true, ref:"books", trim:true},
    reviewedBy: {type:String, required:true, default: "Guest", trim:true },
    reviewedAt: {type:Date, default:Date.now, required:true},
    rating: {type:Number, required:true, min:1, max:5, trim:true},
    review: {type:String,trim:true },
    isDeleted: {type:Boolean, default: false, trim:true},
    


    // bookId: { type: ObjectId, ref: "books", trim: true },
    // reviewedBy: { type: String, default: "Guest", trim: true },
    // reviewedAt: { type: Date, default: Date, trim: true },
    // rating: { type: Number, required: true, trim: true },
    // review: { type: String, trim: true },
    // isDeleted: { type: Boolean, default: false },
    // deletedAt: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
//model will create document using above structure of document
