const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const CustomizeSchema = new Schema({
    fund_creator_name: {
        type: String,
        required: true,
        trim: true
    }, 

    fund_creator_image_paths: {
        type: Array
    }, 
    fund_description: {
        type: String
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});

const Customize = mongoose.model('Customize', CustomizeSchema);

module.exports = Customize;