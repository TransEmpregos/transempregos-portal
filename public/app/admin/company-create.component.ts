import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from './../company.service';
import { Company } from './../company';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-company-edit',
    templateUrl: 'company-edit.component.html',
    styleUrls: ['form.component.css']
})
export class CompanyCreateComponent implements OnInit {

    private company: Company;

    ngOnInit() {
        this.company = new Company();
    }

    constructor(private companyService: CompanyService, private router: Router) {
     }

    async save(form: NgForm) {
        if (form.invalid) {
            return;
        }
        await this.companyService.createAsync(this.company);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/admin/company']);
    }
}