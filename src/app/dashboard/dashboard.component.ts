import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { Stock, StockService } from '../service/stock/stock.service';

@Component({
    selector: 'app-dashboard',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
    stocks: Stock[] = []

    constructor(private stockService: StockService) { }

    ngAfterViewInit(): void {
        this.stockService.getStocks().then((response) => {
            if (typeof response === 'string') {
                console.log(response);
            } else {
                this.stocks = response;
            }
        });
    }

    requestDelete(stock: Stock) {
        console.log('Requested deletion of ' + stock.symbol);
    }
}
