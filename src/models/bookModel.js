const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//structure of document
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    excerpt: { type: String, trim: true },
    userId: { type: ObjectId, ref: "user", trim: true },
    ISBN: { type: String, trim: true },
    category: { type: String, trim: true },
    subcategory: [{ type: String, trim: true }],
    reviews: { type: Number, default: 0, trim: true },
    deletedAt: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
    releasedAt: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", bookSchema);
//model will create document using above structure of document
