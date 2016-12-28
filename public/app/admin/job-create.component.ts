import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-job-edit',
    templateUrl: 'job-edit.component.html'
})
export class JobCreateComponent {
    job = new Job();
    constructor(private jobService: JobService, private router: Router) { }

    async save() {
        await this.jobService.createAsync(this.job);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/admin/job']);
    }
}