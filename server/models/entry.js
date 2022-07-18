const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
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

module.exports = mongoose.model('Entry',entrySchema);