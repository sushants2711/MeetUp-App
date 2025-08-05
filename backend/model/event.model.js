import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    event: {
        type: String,
        enum: ["Online", "Offline"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
        enum: ["Formal", "Casual"],
        default: "Formal"
    },
    speaker: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    venue: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("event", eventSchema);