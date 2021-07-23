var mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);
 
var ProfileSchema = new Schema({
  first_name: {
        type: String,
        required: true
    },
  last_name: {
        type: String,
        required: true
    },
  email: {
        type: String,
        required: true
    },
  phone: {
        type: String,
        required: true
    },
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});
 
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;