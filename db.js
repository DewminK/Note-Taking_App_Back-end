const mongoose= require ('mongoose');  //db.js

const dbURI = process.env.DB_URL;

mongoose.connect(dbURI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('Error connecting to DB', err));
module.exports = mongoose;
