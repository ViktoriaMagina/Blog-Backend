import mongoose from 'mongoose';
const CommentShema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
}, {
    timestamps: true
})

export default mongoose.model("Comment", CommentShema)