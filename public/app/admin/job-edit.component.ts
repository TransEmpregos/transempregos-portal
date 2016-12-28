import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-job-edit',
    templateUrl: 'job-edit.component.html'
})
export class JobEditComponent implements OnInit {
    job: Job;
    constructor(private jobService: JobService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.jobService.getJobAsync(params['id']))
        .subscribe(job => this.job = job);
    }

    async save() {
        await this.jobService.updateAsync(this.job);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/admin/job']);
    }
}