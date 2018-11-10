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

    equals(other: Stock): boolean {
        return other.name === this.name && other.symbol === this.symbol;
    }

    compareTo(other: Stock): number {
        let otherName = other.name;
        let thisName = this.name;

        if (thisName == otherName) {
            return 0;
        } else if (thisName < otherName) {
            return -1;
        } else {
            1;
        }
    }
}

export class StockList {
    stocks: Stock[];

    constructor(stocks: Stock[] = []) {
        this.stocks = stocks;
    }

    size() {
        return this.stocks.length;
    }

    sort() {
        this.stocks.sort((a, b) => a.compareTo(b));
    }

    add(stock: Stock): boolean {
        var desiredIndex = 0;
        var counter = 0;
        for (let s of this.stocks) {
            let comparison = s.compareTo(stock);
            if (comparison === -1) {
                desiredIndex = counter;
            } else if (comparison === 0) {
                return false;
            } else {
                break;
            }

            counter += 1;
        }

        this.stocks.splice(desiredIndex, 0, stock);
        return true;
    }

    remove(stock: Stock): boolean {
        let stockIndex = this.stocks.findIndex(s => s.equals(stock));
        if (stockIndex < 0) {
            return false;
        }

        this.stocks.splice(stockIndex, 1);
        return true;
    }

    toString(): string {
        this.sort();
        return this.stocks.map(s => s.symbol).join(',');
    }
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

    getStockQuotes = ((stockSymbols: string[]): Promise<StockList> => {
        return this.http.get(this.iexStocksUrl(stockSymbols)).toPromise().then(response => {
            stockSymbols.sort();

            let responseBody = response.json();
            let stocks: Stock[] = [];
            for (let stockSymbol of stockSymbols) {
                if (stockSymbol in responseBody) {
                    let stockItem = responseBody[stockSymbol]['quote'];

                    let stock = new Stock();
                    stock.symbol = stockSymbol;
                    stock.name = stockItem['companyName'];
                    stock.price = stockItem['latestPrice'];
                    stock.close = stockItem['close'];

                    console.log(stockItem);
                    console.log(stock.name);

                    stocks.push(stock);
                }
            }

            return new StockList(stocks);
        });
    }).bind(this);

    getStocks(): Promise<StockList> {
        return this.getStockList().then((response) => {
            return this.getStockQuotes(response);
        });
    }

    setStocks(stockList: StockList): Promise<boolean> {
        return this.http
            .put(this.MASHAPE_URL, stockList.toString(), { headers: this.mashapeHeaders })
            .toPromise()
            .then(response => {
                if (response && 'status' in response.json()) {
                    return response.json()['status'] === 'ok'
                } else {
                    console.log('response was: ');
                    console.log(response.json());
                    return false;
                }
            });
    }
}
