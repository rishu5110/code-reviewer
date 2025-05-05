const ConnectDb = async()=>{
    try {
        const mongoose = require('mongoose');
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
}

module.exports = ConnectDb;