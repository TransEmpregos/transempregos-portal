import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../resume.service';
import { Resume } from '../resume';
import { College } from '../college';
import { JobUser } from '../jobuser';

@Component({
    moduleId: module.id,
    selector: 'trans-user-resume-edit',
    templateUrl: 'resume-edit.component.html',
})
export class ResumeCreateComponent implements OnInit {

    private resume: Resume;
    private college: College;
    private job: JobUser;
    private submitted: boolean;
    public area: string;
    dataPickerCollege: { year: number, month: number, day: number };
    datePickerJob: { year: number, month: number, day: number };

    constructor(private resumeService: ResumeService, private router: Router) { }

    ngOnInit() {
        this.resume = new Resume();
        this.submitted = false;
        this.college = new College();
        this.job = new JobUser();
    }

    addCollege(college: College) {
        if (college) {
            let dateCourse = new Date( this.dataPickerCollege.year, this.dataPickerCollege.month, this.dataPickerCollege.day );
            college.date = dateCourse;
            this.resume.addFormation(college);
        }
    }

    removeCollege(college: College) {
        this.resume.removeFormation(college);
    }

    addJOb(job: JobUser) {
        if (job) {
            let jobDate = new Date( this.datePickerJob.year, this.datePickerJob.month, this.datePickerJob.day );
            job.initialDate = jobDate;
            this.resume.addJob(job);
        }
    }

    removeJob(job: JobUser) {
        this.resume.removeJob(job);
    }

    addAreaOfInterest(area: string) {
        this.resume.addAreaOfInterest(area);
    }

    removeAreaOfInterest(area: string) {
        this.resume.removeAreaOfInterest(area);
    }

    async save() {
        this.submitted = true;
        await this.resumeService.createAsync(this.resume);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/user']);
    }

    get diagnostic() { return JSON.stringify(this.resume); }

}