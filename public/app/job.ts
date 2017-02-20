import { Company } from './company';
export class Job {
    _id: string;
    name: String;
    description: String;
    howToSubscribe: String;
    salaryRange: String;
    opportunityType: String;
    contractType: String;
    state: String;
    city: String;
    companyId: String;

    constructor () {
        let j  = new Company();
        this.companyId = j._id;
    }
}