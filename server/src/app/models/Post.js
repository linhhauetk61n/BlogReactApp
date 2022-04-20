const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema(
    {
        title: String,
        message: String,
        name: String,
        creator: String,
        tags: [String],
        selectedFile: String,
        likes: { type: Array, default: [] },
        comments: { type: [String], default: [] },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
