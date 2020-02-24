import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

interface OtherOptions {
  responseType?: any;
  observe?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CustomHttp {
    httpOptions: any;
    base_url = `${environment.apiUrl}`;
    constructor(private http: HttpClient) {

    }

    /* This function is use for call api wtih post method  */
    post(url: string, body: any, otherOptions?: OtherOptions) {
        const token = localStorage.access_token;
        
        /*If token exist then pass token else call API without token */
        if (token) {
            this.httpOptions = {
                headers: new HttpHeaders({ 'token': token })
            };

            if (otherOptions && otherOptions.responseType) 
            {
                this.httpOptions = Object.assign({}, this.httpOptions, otherOptions);
                return this.http.post<any>(this.base_url, body, this.httpOptions);
            }
            else 
            {
                return this.http.post<any>(url, body, this.httpOptions);
            }
        } else {
            return this.http.post(url, body);
        }

    }
 
    post_image(url: string, body: any,image_ext:any,otherOptions?: OtherOptions) {
        const token = localStorage.access_token;

        /*If token exist then pass token else call API without token */
        if (token) {
            this.httpOptions = {
                headers: new HttpHeaders({ 'access_token': token}),
                'responseType':'json',
                'Content-Type': 'image/'+image_ext              
            };

            if (otherOptions && otherOptions.responseType) 
            {
                this.httpOptions = Object.assign({}, this.httpOptions, otherOptions);
                return this.http.post<any>(this.base_url, body, this.httpOptions);
            } else 
            {
                return this.http.post<any>(url, body, this.httpOptions);
            }
        } else {
            return this.http.post(url, body);
        }

    }

}
