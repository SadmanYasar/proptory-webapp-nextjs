import { model, models, Schema } from "mongoose";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    fullname: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    role: {
        type: String,
        required: true,
        default: 'USER'
    },
    // listings: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Listing'
    //     }
    // ]
});

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
        delete returnedObject.role;
    },
});

const Agent = models.Agent || model('Agent', schema);

export default Agent;