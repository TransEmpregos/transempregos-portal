import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ResumeService } from '../resume.service';
import { Resume } from '../resume';

@Component({
    moduleId: module.id,
    selector: 'trans-user-resume-edit',
    templateUrl: 'resume-edit.component.html'
})
export class ResumeEditComponent implements OnInit {
    resume: Resume;
    constructor(private resumeService: ResumeService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.resumeService.getResumeAsync(params['id']))
        .subscribe(resume => this.resume = resume);
    }

    async save() {
        await this.resumeService.updateAsync(this.resume);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/user']);
    }
}