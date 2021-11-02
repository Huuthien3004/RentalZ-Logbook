const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({

    property: {
        type: String,
        required:true
    },
    bedroom: {
        type: String,
        required: true
    },
    furniture: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true,
    },
    note: {
        type: String
    },
    reporter: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

itemSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


exports.Item = mongoose.model('Item', itemSchema);