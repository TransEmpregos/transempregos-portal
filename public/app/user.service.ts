import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from './user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private loggedIn = false;

    constructor(private http: Http, private localStorageService: LocalStorageService) {
        if (this._token && this._user)
            this.loggedIn = true;
    }

    async loginAsync(userNameOrEmail: string, password: string): Promise<void> {
        if (this.loggedIn) return;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let res: Response;
        try {
            res = await this.http
                .post('/api/login', JSON.stringify({ userNameOrEmail, password }), { headers })
                .toPromise();
        } catch (error) {
            return;
        }
        const resp = <{ user: User, token: string }>res.json();
        if (!resp.user) return;
        this._token = resp.token;
        this._user = resp.user;
        this.loggedIn = true;
    }

    logout() {
        this._token = null;
        this._user = null;
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    get user() {
        return this._user;
    }

    private get _user() {
        return <User>this.localStorageService.get('user');
    }
    private set _user(u: User | null) {
        if (u == null)
            this.localStorageService.remove('user');
        else
            this.localStorageService.set('user', u);
    }
    get token() {
        return this._token;
    }
    private get _token() {
        return <string>this.localStorageService.get('auth_token');
    }
    private set _token(t: string | null) {
        if (t == null)
            this.localStorageService.remove('auth_token');
        else
            this.localStorageService.set('auth_token', t);
    }
}