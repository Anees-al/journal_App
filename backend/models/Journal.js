import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    mood: {
        type: String,
        default: '😊'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Journal = mongoose.model('Journal', JournalSchema);
export default Journal;
