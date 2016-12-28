import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Job } from './job';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JobService {
    private jobsUrl = 'api/jobs';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    async getAllAsync(): Promise<Job[]> {
        try {
            const response = await this.http.get(this.jobsUrl).toPromise();
            const jobs = response.json() as Job[];
            return jobs;

        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async getJobAsync(id: string): Promise<Job> {
        const url = `${this.jobsUrl}/${id}`;
        try {
            const response = await this.http.get(url).toPromise();
            const job = response.json() as Job;
            return job;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async updateAsync(job: Job): Promise<void> {
        const url = `${this.jobsUrl}/${job._id}`;
        try {
            await this.http.put(url, JSON.stringify(job), { headers: this.headers }).toPromise();
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async createAsync(job: Job): Promise<Job> {
        try {
            const result = await this.http.post(this.jobsUrl, JSON.stringify(job), { headers: this.headers }).toPromise();
            return result.json().data as Job;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async deleteAsync(id: string): Promise<void> {
        const url = `${this.jobsUrl}/${id}`;
        try {
            await this.http.delete(url, { headers: this.headers }).toPromise();
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }
}