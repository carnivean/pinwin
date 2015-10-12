'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
  username: String,
  url: String,
  likes: []
});

module.exports = mongoose.model('Link', LinkSchema);
