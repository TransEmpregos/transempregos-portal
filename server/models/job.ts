import { Schema, model } from 'mongoose';
const JobSchema = new Schema({
    companyName: {type: String, required: true},
    fantasyName: {type: String, required: true},
    cnpj: {type: String, required: true},
    showCompanyName: Boolean,
    opportunityName: {type: String, required: true},
    opportunityDecription: {type: String, required: true},
    howToSubscribe: {type: String, required: true},
    contact: {
        email: {type: String, required: true},
        name: {type: String, required: true},
        phone: {type: String, required: true}
    },
    salaryRange: {type: String, required: true},
    opportunityType: {type: String, required: true},
    contractType: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true}
});
export const Job = model('Job', JobSchema);