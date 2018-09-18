import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        MaterialModule,
    ],
    declarations: [
        DashboardComponent,
    ], entryComponents: [
        // Dialog components
    ]
})

export class DashboardModule { }
