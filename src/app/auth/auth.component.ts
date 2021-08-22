import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth-response';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-component',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggedInMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authSerice: AuthService, private router: Router) {}

    onSwitchMode(): void {
        this.isLoggedInMode = !this.isLoggedInMode;
    }

    onSubmit(form: NgForm): void {
        if(!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;
        let authObservables: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoggedInMode) {
            authObservables = this.authSerice.login(email, password);
        }else {
            // this.authSerice.signUp(email, password).subscribe(
            //     resData => {
            //         console.log(resData);
            //         this.isLoading = false;
            //     },
            //     errorMessage => {
            //         console.log(errorMessage);
            //         this.error = errorMessage;
            //         this.isLoading = false;
            //     }
            // )
            // this 👆 or this 👇 is still valid
            // if the later one is used then one will have to subscribe to the authObservables afterwards 
            authObservables = this.authSerice.signUp(email, password);
        }

        authObservables.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;

                this.isLoading = false;
            }
        );

        form.reset();
    }
}