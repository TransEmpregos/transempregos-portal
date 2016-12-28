import { Schema, model } from 'mongoose';
const JobSchema = new Schema({
    name: String
});
export const Job = model('Job', JobSchema);