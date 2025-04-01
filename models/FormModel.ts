import mongoose from 'mongoose'

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    theme: {
        type: String,
    },
    elements: {
        type: [Object],
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    responses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Response',
        default: []
    },

}, {
    timestamps: true
})

const FormModel = mongoose.model('Form', formSchema)
export default FormModel