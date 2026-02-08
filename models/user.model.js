import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unqiue: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unqiue: true,
        trim: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String, // claudinary / AWS bucket
        required: true,
    },
    coverImage: {
        type: String, // claudinary / AWS bucket
        default: ""
    },
    watchHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true });

userSchema.pre("save", async function (next) { // Arrow func ()=> {} isn't used because we don't have access to `this` keyword. we need schema context to peform operations/ manipulate data

    if (!this.isModified("password")) return next(); // only hash password when password field is modified
    this.password = await bcrypt.hash(this.password, 10);
    next();

}); // pre Hook runs before the data gets saved.

// Custom Methods
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};



const User = mongoose.model("User", userSchema);
export default User;