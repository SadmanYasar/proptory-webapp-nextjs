import { model, models, Schema } from "mongoose";

const schema = new Schema({
    // agent: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Agent'
    // },
    agentContact: {
        type: String,
        required: true,
        minlength: 10
    },
    matterportId: {
        type: String,
        required: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    address: {
        type: String,
        required: true,
        minlength: 10
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Listing = models.Listing || model('Listing', schema);

export default Listing;