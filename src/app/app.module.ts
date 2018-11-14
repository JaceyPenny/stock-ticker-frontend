import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginLayoutComponent } from './login/layout/login-layout.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './service/auth-guard/auth.guard';
import { StorageService } from './service/storage/storage.service';
import { AuthenticationService } from './service/authentication/authentication.service';
import { Http, HttpModule } from '@angular/http';
import { MaterialModule } from './material/material.module';
import { DashboardLayoutComponent } from './dashboard/layout/dashboard-layout.component';
import { StockService } from './service/stock/stock.service';
import { SearchService } from './service/search/search.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    StorageService,
    AuthenticationService,
    StockService,
    SearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
