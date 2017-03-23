import { CompanyService } from './../company.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-job-details',
    templateUrl: 'job-details.component.html',
    styleUrls: ['base-test.component.css']
})
export class JobDetailsComponent implements OnInit {
    job: Job;
    empresa: any;
    constructor(private jobService: JobService, private companyService: CompanyService,
     private route: ActivatedRoute, private router: Router) {
     }

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.jobService.getJobAsync(params['id']))
        .subscribe(job => {
        this.job = job;
        let empresa = this.companyService.getCompanyAsync(job.companyId.toString());

        empresa.then(data => {
            this.empresa = (data.companyName);
            });
    });
    }

    goBack() {
        this.router.navigate(['/admin/job']);
    }
}