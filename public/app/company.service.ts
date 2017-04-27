import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpAuth } from './httpAuth';
import { Company } from './company';
import { Job } from './job';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanyService {
    private companiesUrl = 'api/companies';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: HttpAuth) { }

    async getAllAsync(): Promise<Company[]> {
        try {
            const response = await this.http.get(this.companiesUrl).toPromise();
            const companies = response.json() as Company[];
            return companies;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async getCompanyAsync(id: string): Promise<Company> {
        const url = `${this.companiesUrl}/${id}`;
        try {
            const response = await this.http.get(url).toPromise();
            const company = response.json() as Company;
            return company;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async getAllCompanyJobsAsync(id: string): Promise<Job[]> {
        const url = `${this.companiesUrl}/${id}/jobs`;
        try {
            const response = await this.http.get(url).toPromise();
            const companyJobs = response.json() as Job[];
            return companyJobs;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async updateAsync(company: Company): Promise<void> {
        const url = `${this.companiesUrl}/${company._id}`;
        try {
            await this.http.put(url, JSON.stringify(company), { headers: this.headers }).toPromise();
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async createAsync(company: Company): Promise<Company> {
        try {
            const result = await this.http.post(this.companiesUrl, JSON.stringify(company), { headers: this.headers }).toPromise();
            return result.json().data as Company;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async deleteAsync(id: string): Promise<void> {
        const url = `${this.companiesUrl}/${id}`;
        try {
            await this.http.delete(url, { headers: this.headers }).toPromise();
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }
}