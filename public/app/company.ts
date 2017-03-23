import { Job } from './job';

export class Company {
    _id: string;
    companyName: String;
    comercialName: String;
    showCompany: Boolean;
    governmentId: String;
    contactEmail: String;
    contactName: String;
    contactPhone: String;
    jobs: Job[];
}