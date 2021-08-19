import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthResponseData } from './auth-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgxazCpucs8zaGeQlA8ewStixPSZVjcxw';
    private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgxazCpucs8zaGeQlA8ewStixPSZVjcxw';
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        const data = {
            email,
            password,
            returnSecureToken: true
        }
        return this.http.post<AuthResponseData>(this.url, data)
            .pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        const data = {
            email,
            password,
            returnSecureToken: true
        }

        return this.http.post<AuthResponseData>(this.loginUrl, data)
            .pipe(catchError(this.handleError));
    }

    private handleError(errRes: HttpErrorResponse) {
        let errorMessage: string;
        if (!errRes.error || !errRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect credentials'
            default:
                errorMessage = 'Sorry, an error ocurred';
                break;
        }
        return throwError(errorMessage);
    }
    
}