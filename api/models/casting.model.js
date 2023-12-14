import mongoose from "mongoose";

const castingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        agency: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        union: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
)

const Casting = mongoose.model('Casting', castingSchema);

export default Casting;