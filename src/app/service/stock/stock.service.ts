import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../auth-guard/credentials';
import { StorageService } from '../storage/storage.service';
import { HttpHeaders } from '@angular/common/http';

export class Stock {
    name: string;
    symbol: string;
    price: number;
    close: number;
}

@Injectable()
export class StockService {
    private MASHAPE_URL = 'https://kvstore.p.mashape.com/collections/stocks/items/stocks';

    constructor(private http: Http, private storageService: StorageService) {}

    get mashapeKey() {
        return this.storageService.credentials.mashapeKey;
    }

    get mashapeHeaders(): Headers {
        const headers = new Headers();
        headers.set('X-Mashape-Key', this.mashapeKey);
        return headers;
    }

    iexStocksUrl(stockSymbols: string[]): string {
        return 'https://api.iextrading.com/1.0/stock/market/batch?symbols=' 
        + stockSymbols.join(',') 
        + '&types=quote&filter=companyName,symbol,latestPrice,close'
    }

    getStockList(): Promise<string[]> {
        return this.http.get(this.MASHAPE_URL, { headers: this.mashapeHeaders }).toPromise().then(response => {
            let stringValue: string = response.json().value;
            return stringValue.split(',');
        });
    }

    getStockQuotes(stockSymbols: string[]): Promise<Stock[]> {
        return this.http.get(this.iexStocksUrl(stockSymbols)).toPromise().then(response => {
            // TODO (jace) map response to list of Stock objects
            return [];
        });
    }

    getStocks(): Promise<Stock[]> {
        return this.getStockList().then((stockSymbols: string[]) => {
            return [];
        });
    }
}
