import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    moduleId: module.id,
    selector: 'trans-login-candidate',
    templateUrl: 'login-candidate.component.html',
    styleUrls: ['login-user.component.css']
})
export class LoginCandidateComponent implements OnInit {

    public user = {
        userNameOrEmail: <null|string>null,
        password: <null|string>null,
        persist: false
    };

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.tryToGoHome();
    }

    async loginAsync() {
        console.log(1111, this.user.userNameOrEmail, this.user.password);
        if (this.user.userNameOrEmail && this.user.password)
            await this.userService.loginAsync(this.user.userNameOrEmail, this.user.password);
        this.tryToGoHome();
    }

    private tryToGoHome() {
        if (this.userService.isLoggedIn())
            this.router.navigate(['']);
    }
}