import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Credentials } from '../auth-guard/credentials';

@Injectable()
export class AuthenticationService {
    private loginUrl = 'api/login';

    constructor(
        private http: Http,
        private storageService: StorageService) { }

    authenticate(username: string, password: string): Promise<Credentials> {
        const body = {
            'username': username,
            'password': password
        };

        return this.http.post(this.loginUrl, body).toPromise().then(response => {
            const json = response.json();
            if (json) {
                const credentials = json as Credentials;
                this.storageService.credentials = credentials;

                return credentials;
            } else {
                throw Error('Invalid response body for expected objec type: Credentials');
            }
        });
    }
}
