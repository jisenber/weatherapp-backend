const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String },
  history : [{
    locationSearched : {type: mongoose.Schema.Types.Mixed},
    dateSearched: {type: Date},
    weatherDate: {type: Date}
  }]
});

//gives authentication props to User object
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);
