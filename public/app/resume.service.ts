import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Resume } from './resume';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResumeService {
    private resumeUrl = 'api/resumes';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    async getAllAsync(): Promise<Resume[]> {
        try {
            const response = await this.http.get(this.resumeUrl).toPromise();
            console.log(response.json());
            const resumes = response.json() as Resume[];
            return resumes;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }


 async getResumeAsync(id: string): Promise<Resume> {
        const url = `${this.resumeUrl}/${id}`;
        try {
            const response = await this.http.get(url).toPromise();
            const resume = response.json() as Resume;
            return resume;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async updateAsync(resume: Resume): Promise<void> {
        const url = `${this.resumeUrl}/${resume._id}`;
        try {
            await this.http.put(url, JSON.stringify(resume), { headers: this.headers }).toPromise();
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async createAsync(resume: Resume): Promise<Resume> {
        try {
            console.log(JSON.stringify(resume));
            const result = await this.http.post(this.resumeUrl, JSON.stringify(resume), { headers: this.headers }).toPromise();
            return result.json().data as Resume;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }
    async deleteAsync(id: string): Promise<void> {
        const url = `${this.resumeUrl}/${id}`;
        try {
            await this.http.delete(url, { headers: this.headers }).toPromise();
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }
}