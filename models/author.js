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
  var bdate = moment(this.date_of_birth).format('MMMM Do, YYYY');
  }
  if (this.date_of_death != null){
  var ddate = moment(this.date_of_death).format('MMMM Do, YYYY');
  }
  return (bdate == null && ddate != null) ? 'Birth N/A - ' + ddate : (bdate != null && ddate == null) ? bdate + ' - Death N/A' :(bdate == null && ddate == null) ? 'Lifespan N/A' : bdate + ' - ' + ddate;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);