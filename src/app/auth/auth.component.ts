import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggedInMode = true; 

    onSwitchMode(): void {
        this.isLoggedInMode = !this.isLoggedInMode;
    }

    onSubmit(form: NgForm): void {
        console.log(form.value);
        form.reset();
    }
}