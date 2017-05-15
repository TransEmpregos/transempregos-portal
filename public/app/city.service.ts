import { Injectable } from '@angular/core';
import { HttpAuth } from './httpAuth';
import { City } from './city';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CityService {

    private citiesUrl = 'api/cities';

    constructor(private http: HttpAuth) {}

    async getCitiesAsync(): Promise<City[]> {
        try {
            const response = await this.http.get(this.citiesUrl).toPromise();
            const cities = response.json() as City[];
            return cities;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }

    async getCityAsync(id: string): Promise<City> {
        const url = `${this.citiesUrl}/${id}`;
        try {
            const response = await this.http.get(url).toPromise();
            const city = response.json() as City;
            return city;
        } catch (error) {
            console.error(`An error ocurred: ${error}`);
            throw error;
        }
    }
}