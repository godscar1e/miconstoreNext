

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String, // URL to the profile photo
    }
}, { timestamps: true });

let User;

try {
    // Попытка получить существующую модель
    User = mongoose.models.User || mongoose.model('User', userSchema);
} catch (e) {
    // Создание новой модели, если нет существующей
    User = mongoose.model('User', userSchema);
}

export { User };
