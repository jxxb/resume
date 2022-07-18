// export class Info {
//    constructor(
//       public id: string,
//       public name: string,
//       public phone: string,
//       public email: string,
//       public major: string,
//       public minor: string,
//       public certificate: string,
//       public cluster: string,
//       public gpa: string,
//       public school: string,
//       public gradation: string,
//       public imageUrl: string,
//       public link: string,
//    ){}
// }

const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
id: {type: String, required:true},
title: {type: String, required:true},
company: {type: String, required:true},
date: {type: String, required:true},
location: {type: String, required:true},
category: {type: String, required:true},
action: {type: String, required:true},
imageUrl: {type: String, required:false},
link: {type: String, required:false},
})

module.exports = mongoose.model('Info',infoSchema);