import { Contact } from './contact';

export class Job {
    _id: string;
    companyName: string;
    fantasyName: String;
    cnpj: String;
    showCompanyName: Boolean;
    opportunityName: String;
    opportunityDecription: String;
    howToSubscribe: String;

    contact: Contact;
    salaryRange: String;
    opportunityType: String;
    contractType: String;
    city: String;
    state: String;
    constructor() { this.contact = new Contact(); };
}