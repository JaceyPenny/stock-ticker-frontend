import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { StockService, BrightnessSpeed } from '../../service/stock/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-brightness-speed',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './brightness-speed.component.html',
    styleUrls: ['./brightness-speed.component.scss']
})
export class BrightnessSpeedComponent implements AfterViewInit {

    loadingBS = true;
    brightness = 50;
    speed = 1;

    constructor(private stockService: StockService, private snackBar: MatSnackBar) {}

    ngAfterViewInit(): void {
        this.stockService.getBrightnessSpeed().then(response => {
            this.loadingBS = false;
            this.brightness = response.brightness;
            this.speed = response.speed;
        });
    }

    showSnackBar(message: string, duration: number = 2000) {
        this.snackBar.open(message, null, {
            duration: duration
        });
    }

    brightnessChanged(value) {
        this.brightness = value;
    }

    speedChanged(value) {
        this.speed = value;
    }

    submitClicked() {
        if (this.loadingBS) {
            return;
        }

        console.log(this.brightness);
        console.log(this.speed);

        const brightnessSpeed = new BrightnessSpeed();
        brightnessSpeed.brightness = this.brightness;
        brightnessSpeed.speed = this.speed;

        this.loadingBS = true;
        this.stockService.setBrightnessSpeed(brightnessSpeed).then(response => {
            this.loadingBS = false;
            if (response) {
                this.showSnackBar('Settings saved successfully!');
            } else {
                this.showSnackBar('Settings could not be saved');
            }
        });
    }
}
