import { Component } from '@angular/core';
import { StorageService } from '../../service/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
    constructor(private storageService: StorageService, private router: Router) { }

    onLogoutClicked() {
        this.storageService.logOut();
        this.router.navigate(['login']);
    }
}
