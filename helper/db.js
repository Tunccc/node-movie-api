const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect('mongodb+srv://tunc:asdzxc123@cluster0-sywgu.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,useUnifiedTopology: true })
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');   
    });
    mongoose.connection.on('error', (err) => {
        
        console.log('MongoDB: Error', err);   
    });

    mongoose.Promise = global.Promise;
}