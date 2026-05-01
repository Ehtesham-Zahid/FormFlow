import mongoose from "mongoose"

const FieldSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["text", "email", "number"],
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

const FormSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        fields: [FieldSchema],
        userId: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const Form = mongoose.models.Form || mongoose.model("Form", FormSchema);