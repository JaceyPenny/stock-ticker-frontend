import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { Stock, StockService, StockList } from '../service/stock/stock.service';
import { SearchService, SearchResult } from '../service/search/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dashboard',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
    SEARCH_LOADED = 0;
    LOADING_SEARCH = 1;
    SEARCHING = 2;

    stockList: StockList = new StockList();
    searchState = this.LOADING_SEARCH;
    searchResults: SearchResult[] = [];

    get shouldShowSpinner(): boolean {
        return this.searchState === this.LOADING_SEARCH || this.searchState === this.SEARCHING;
    }

    constructor(
        private stockService: StockService,
        private searchService: SearchService,
        private snackBar: MatSnackBar) { }

    showSnackBar(message: string, duration: number = 2000) {
        this.snackBar.open(message, null, {
            duration: duration
        });
    }

    ngAfterViewInit(): void {
        this.stockService.getStocks().then((response) => {
            if (typeof response === 'string') {
                console.log(response);
            } else {
                this.stockList = response;
            }
        });

        this.searchService.initializeSearch().then(response => {
            if (response) {
                this.searchState = this.SEARCH_LOADED;
            }
        });
    }

    requestDelete(stock: Stock) {
        this.stockList.remove(stock);
        this.stockService.setStocks(this.stockList).then(ok => {
            if (ok) {
                this.showSnackBar('Removed ' + stock.symbol + ' from your stocks.');
            } else {
                this.showSnackBar('Something went wrong. ' + stock.symbol + ' was not added.');
            }
        });
    }

    requestSearch(value: string) {
        if (value.length <= 1) {
            this.searchResults = [];
            return;
        }

        if (this.searchState === this.SEARCHING) {
            return;
        }

        this.searchState = this.SEARCHING;
        this.searchService.search(value).then(response => {
            this.searchState = this.SEARCH_LOADED;
            this.searchResults = response;
        });
    }

    requestAdd(searchResult: SearchResult) {
        this.stockService.getStockQuote(searchResult.symbol).then(stock => {
            if (stock !== null) {
                if (this.stockList.add(stock)) {
                    this.stockService.setStocks(this.stockList).then(ok => {
                        if (ok) {
                            this.showSnackBar('Added ' + stock.symbol + ' to your stocks.');
                        } else {
                            this.stockList.remove(stock);
                            this.showSnackBar('Something went wrong. Could not add ' + stock.symbol + '.');
                        }
                    });
                } else {
                    this.showSnackBar('You are already tracking ' + stock.symbol + '!');
                }
            } else {
                this.showSnackBar('Something went wrong. Could not add ' + searchResult.symbol);
            }
        });
    }
}
