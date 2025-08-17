import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'manager'],
        default: 'admin'
    }
},{
    timestamps: true
},{
    collection: 'admin'
});

const User = mongoose.model('User', userSchema);
export default User;