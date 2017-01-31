import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(protected userService: UserService) { }

    canActivate() {
        return this.userService.isLoggedIn();
    }
}

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(protected userService: UserService) { }

    canActivate() {
        if (!this.userService.isLoggedIn())
            return false;
        if (this.userService.user)
            return this.userService.user.isAdmin;
        return false;
    }
}

@Injectable()
export class RecruiterGuard implements CanActivate {
    constructor(protected userService: UserService) { }

    canActivate() {
        if (!this.userService.isLoggedIn())
            return false;
        if (this.userService.user)
            return this.userService.user.isRecruiter;
        return false;
    }
}