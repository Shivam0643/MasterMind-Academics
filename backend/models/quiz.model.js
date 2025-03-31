import mongoose from 'mongoose';
import validator from 'validator';

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    quizUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
            message: 'Invalid URL format for quizUrl.',
        },
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

export const Quiz = mongoose.model('Quiz', quizSchema);
