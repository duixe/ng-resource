import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthResponseData } from './auth-response';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgxazCpucs8zaGeQlA8ewStixPSZVjcxw';
    private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgxazCpucs8zaGeQlA8ewStixPSZVjcxw';
    constructor(private http: HttpClient) {}
    public user = new Subject<User>();

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
            .pipe(catchError(this.handleError), tap( resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    private handleAuth(email: string, userId: string, token: string, expires: number) {
        const expirationDate = new Date(new Date().getTime() + +expires * 1000);

        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );

        this.user.next(user);
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