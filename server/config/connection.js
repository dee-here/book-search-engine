const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
//mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:password_123@cluster0.cdag1ph.mongodb.net/googlebooks?retryWrites=true&w=majority');
module.exports = mongoose.connection;
