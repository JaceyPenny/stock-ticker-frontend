import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loading = false;

    login: FormGroup;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar) {

        this.login = formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required],
        });
    }

    showSnackBar(message: string, duration: number = 2000) {
        this.snackBar.open(message, null, {
            duration: duration
        });
    }

    loginClicked() {
        if (this.loading) {
            return;
        }

        if (!this.login.valid) {
            this.showSnackBar('Please fill all fields');
            return;
        }

        this.loading = true;

        const username = this.login.value['username'];
        const password = this.login.value['password'];

        this.authenticationService.authenticate(username, password).then(_ => {
            this.loading = false;
            this.router.navigate(['dashboard']);
        }, _ => {
            this.loading = false;
            this.showSnackBar('Invalid login. Please try again.', 4000);
        });
    }
}
