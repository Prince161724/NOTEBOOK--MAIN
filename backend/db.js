
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connecttoMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
    // ...removed unnecessary log...
    } catch (error) {
        
    }
};

module.exports = connecttoMongo;
