import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    // private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // get isLoggedIn() {
    //     return this.loggedIn.asObservable();
    //   }

    constructor(
        private http: HttpClient,
        private router: Router,
        ) { }

    
    login(post_data) {

           //let api_url = 'http://localhost:3005/admin_api/login_angular';
           let api_name = `${environment.api_name}`;

        return this.http.post(api_name+'login_angular',post_data)
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {                                       
                    localStorage.setItem('id', user['data']['_id']);
                    localStorage.setItem('access_token', user['data']['access_token']);
                    localStorage.setItem('userData', JSON.stringify(user['data']));
                   // this.loggedIn.next(true);
                    this.router.navigate(['/']);

                }
                return user;
            });
    }

    
}