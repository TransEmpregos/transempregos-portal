import { Schema, model } from 'mongoose';
const ResumeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    register: { type: String, required: true },
    collegeFormation: [{date: Date, description: String, name: String, nameOfCurse: String}],
    jobList: [{ salary: Number, name: String, initialDate: Date, lastDate: Date, description: String }],
    areasOfInterest: [String],
    phone: { type: String }
});
export const Resume = model('Resume', ResumeSchema);