import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-job-edit',
    templateUrl: 'job-edit.component.html'
})
export class JobCreateComponent implements OnInit {

    private job: Job;

    ngOnInit() {
        this.job = new Job();
    }

    constructor(private jobService: JobService, private router: Router) {
     }

    async save(form: NgForm) {
        if (form.invalid) {
            return;
        }
        await this.jobService.createAsync(this.job);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/admin/job']);
    }
}