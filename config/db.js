const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,
        //useFindAndModify: true
    });
    console.log("Mongoose is connected");
};

module.exports = connectDB;