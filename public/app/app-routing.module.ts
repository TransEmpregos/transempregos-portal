import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginRecruiterComponent } from './login/login-recruiter.component';
import { LoginCandidateComponent } from './login/login-candidate.component';
import { JobEditComponent } from './admin/job-edit.component';
import { JobsListComponent } from './admin/jobs-list.component';
import { JobCreateComponent } from './admin/job-create.component';
import { RecruiterGuard } from './route.guards';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login/recruiter', component: LoginRecruiterComponent },
    { path: 'login/candidate', component: LoginCandidateComponent },
    { path: 'admin', component: AdminComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/job', component: JobsListComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/job/create', component: JobCreateComponent, canActivate: [RecruiterGuard] },
    { path: 'admin/job/:id', component: JobEditComponent, canActivate: [RecruiterGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }