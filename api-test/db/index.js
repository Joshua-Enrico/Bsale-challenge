const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MongoDB = async () => {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
}

module.exports = { MongoDB };