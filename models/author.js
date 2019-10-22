var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  if (this.date_of_birth != null){
  var dob = moment(this.date_of_birth).utc().format('MMMM Do, YYYY');
  }
  if (this.date_of_death != null){
  var dod = moment(this.date_of_death).utc().format('MMMM Do, YYYY');
  }
  return (dob == null && dod != null) ? 'Birth N/A - ' + dod : (dob != null && dod == null) ? dob + ' - Death N/A' :(dob == null && dod == null) ? 'Lifespan N/A' : dob + ' - ' + dod;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);