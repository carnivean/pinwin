'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
  username: [],
  url: String,
  likes: []
});

module.exports = mongoose.model('Link', LinkSchema);
