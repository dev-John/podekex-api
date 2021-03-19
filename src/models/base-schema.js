import mongoose from 'mongoose';

mongoose.pluralize(null);

const schema = new mongoose.Schema({}, { strict: 'throw', timestamps: true });

export default schema;
