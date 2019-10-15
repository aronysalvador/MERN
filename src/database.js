const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-tasks';


mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, })
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("DB Connection Error: ${err.message}");
});


module.exports = mongoose;
