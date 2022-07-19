const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
id: {type: String, required:true},
name: {type: String, required:true},
phone: {type: String, required:true},
email: {type: String, required:true},
major: {type: String, required:true},
minor: {type: String, required:false},
certificate: {type: String, required:false},
cluster: {type: String, required:false},
gpa: {type: String, required:false},
school: {type: String, required:false},
graduation: {type: String, required:false},
imageUrl: {type: String, required:false},
link: {type: String, required:false},
})

module.exports = mongoose.model('Info',infoSchema);