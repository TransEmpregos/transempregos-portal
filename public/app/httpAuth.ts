import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptionsArgs } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class HttpAuth {
    constructor(private http: Http, private userService: UserService) { }
    request(url: string | Request, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.get(url, options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.post(url, body, options);
    }

    put(url: string, body: any, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.delete(url, options);
    }

    patch(url: string, body: any, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.patch(url, body, options);
    }

    head(url: string, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.head(url, options);
    }

    options(url: string, options?: RequestOptionsArgs) {
        options = this.getOptions(options);
        return this.http.options(url, options);
    }

    private getOptions(options?: RequestOptionsArgs) {
        options = options || {};
        options.headers = options.headers || new Headers();
        options.headers.append('Authorization', `Bearer ${this.userService.token}`);
        return options;
    }

}