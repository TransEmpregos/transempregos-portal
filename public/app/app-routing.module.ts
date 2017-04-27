import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginRecruiterComponent } from './login/login-recruiter.component';
import { LoginCandidateComponent } from './login/login-candidate.component';
import { JobEditComponent } from './admin/job-edit.component';
import { JobsListComponent } from './admin/jobs-list.component';
import { JobCreateComponent } from './admin/job-create.component';
import { JobDetailsComponent } from './admin/job-details.component';
import { CompanyDetailsComponent } from './admin/company-details.component';
import { CompaniesListComponent } from './admin/companies-list.component';
import { CompanyCreateComponent } from './admin/company-create.component';
import { CompanyEditComponent } from './admin/company-edit.componet';
import { RecruiterGuard } from './route.guards';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login/recruiter', component: LoginRecruiterComponent },
    { path: 'login/candidate', component: LoginCandidateComponent },
    { path: 'admin', component: AdminComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/job', component: JobsListComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/job/create', component: JobCreateComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/job/:id', component: JobEditComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/job/details/:id', component: JobDetailsComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/company', component: CompaniesListComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/company/create', component: CompanyCreateComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/company/:id', component: CompanyEditComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/company/details/:id', component: CompanyDetailsComponent, canActivate: [RecruiterGuard] }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }