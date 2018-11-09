import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Stock } from '../stock/stock.service';

export class SearchResult {
    symbol: string;
    name: string;
}

@Injectable()
export class SearchService {
    private SUPPORTED_SYMBOLS_URL = 'https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name';
    
    private supportedSymbols: SearchResult[] = [];
    constructor(private http: Http) {}

    initializeSearch(): Promise<boolean> {
        return this.http.get(this.SUPPORTED_SYMBOLS_URL).toPromise().then(response => {
            if (response.ok) {
                let results = response.json();
                this.supportedSymbols = [];

                for (let item of results) {
                    let searchResult = new SearchResult();
                    searchResult.name = item['name'];
                    searchResult.symbol = item['symbol'];
                    this.supportedSymbols.push(searchResult);
                }

                return true;
            } else {
                return false;
            }
        });
    }

    async search(searchTerm: string): Promise<SearchResult[]> {
        searchTerm = searchTerm.toLowerCase();
        let results: SearchResult[] = [];
        for (let item of this.supportedSymbols) {
            if (item.name.toLowerCase().includes(searchTerm) || item.symbol.toLowerCase().includes(searchTerm)) {
                results.push(item);
            }
        }

        return results;
    }
}
