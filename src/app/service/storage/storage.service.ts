import { Injectable } from '@angular/core';
import { Credentials } from '../auth-guard/credentials';

@Injectable()
export class StorageService {

    private static CREDENTIALS_KEY = 'stock_ticker_creds_key_local';

    constructor() {}

    set credentials(credentials: Credentials) {
        localStorage.setItem(StorageService.CREDENTIALS_KEY, JSON.stringify(credentials));
    }

    get credentials(): Credentials {
        return JSON.parse(localStorage.getItem(StorageService.CREDENTIALS_KEY));
    }

    public authenticated() {
        return !!this.credentials;
    }

    public logOut() {
        localStorage.removeItem(StorageService.CREDENTIALS_KEY);
    }
}
