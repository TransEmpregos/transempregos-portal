import { Schema, model } from 'mongoose';
const JobSchema = new Schema({
    name: String
});
const Job = model('Job', JobSchema);
export default Job;