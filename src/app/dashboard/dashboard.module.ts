import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MaterialModule } from '../material/material.module';
import { BrightnessSpeedComponent } from './brightness-speed/brightness-speed.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        MaterialModule,
    ],
    declarations: [
        DashboardComponent,
        BrightnessSpeedComponent,
    ], entryComponents: [
        // Dialog components
    ]
})

export class DashboardModule { }
