import { Injectable } from '@angular/core';
import { HttpAuth } from './httpAuth';
import { State } from './state';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StateService {

    private statesUrl = 'api/states';

    constructor(private http: HttpAuth) {}

    async getStatesAsync(): Promise<State[]>{
        try {
            const response = await this.http.get(this.statesUrl).toPromise();
            const states = response.json() as State[];
            return states; 
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async getStateAsync(id: string): Promise<State> {
        const url = `${this.statesUrl}/${id}`;
        try {
            const response = await this.http.get(url).toPromise();
            const state = response.json() as State;
            return state;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }
}