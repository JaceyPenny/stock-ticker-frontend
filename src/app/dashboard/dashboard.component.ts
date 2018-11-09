import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { Stock, StockService } from '../service/stock/stock.service';
import { SearchService, SearchResult } from '../service/search/search.service';

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

    stocks: Stock[] = []
    searchState = this.LOADING_SEARCH;
    searchResults: SearchResult[] = [];

    constructor(private stockService: StockService, private searchService: SearchService) { }

    ngAfterViewInit(): void {
        this.stockService.getStocks().then((response) => {
            if (typeof response === 'string') {
                console.log(response);
            } else {
                this.stocks = response;
            }
        });

        this.searchService.initializeSearch().then(response => {
            if (response) {
                this.searchState = this.SEARCH_LOADED;
            }
        });
    }

    requestDelete(stock: Stock) {
        console.log('Requested deletion of ' + stock.symbol);
    }

    requestSearch(value: string) {
        if (value.length <= 1) {
            this.searchResults = [];
            return;
        }

        this.searchState = this.SEARCHING;
        this.searchService.search(value).then(response => {
            this.searchState = this.SEARCH_LOADED;
            this.searchResults = response;
        });
    }

    requestAdd(searchResult: SearchResult) {
        console.log('Requested addition of ' + searchResult.symbol);
    }
}
