import { CompanyDetailsComponent } from './admin/company-details.component';
import { CompaniesListComponent } from './admin/companies-list.component';
import { CompanyService } from './company.service';
import { CompanyCreateComponent } from './admin/company-create.component';
import { CompanyEditComponent } from './admin/company-edit.componet';
import { JobDetailsComponent } from './admin/job-details.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageModule } from 'angular-2-local-storage';

import { HttpAuth } from './httpAuth';
import { JobService } from './job.service';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { JobEditComponent } from './admin/job-edit.component';
import { JobsListComponent } from './admin/jobs-list.component';
import { JobCreateComponent } from './admin/job-create.component';
import { ModalYesNoComponent } from './modals/modal-yesno.component';
import { ModalOkComponent } from './modals/modal-ok.component';
import { HomeComponent } from './home/home.component';
import { LoginRecruiterComponent } from './login/login-recruiter.component';
import { LoginCandidateComponent } from './login/login-candidate.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminGuard, LoggedInGuard, RecruiterGuard } from './route.guards';
import { UserService } from './user.service';
import './rxjs-extensions';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        LocalStorageModule.withConfig({
            prefix: 'trans-app',
            storageType: 'localStorage'
        })
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        HomeComponent,
        LoginRecruiterComponent,
        LoginCandidateComponent,
        JobEditComponent,
        JobsListComponent,
        JobCreateComponent,
        JobDetailsComponent,
        CompanyEditComponent,
        CompanyCreateComponent,
        CompaniesListComponent,
        CompanyDetailsComponent,
        ModalYesNoComponent,
        ModalOkComponent
    ],
    providers: [HttpAuth, JobService, CompanyService, UserService, AdminGuard, LoggedInGuard, RecruiterGuard],
    entryComponents: [ModalYesNoComponent, ModalOkComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }