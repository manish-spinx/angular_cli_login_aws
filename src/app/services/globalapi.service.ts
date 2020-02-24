import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CustomHttp } from './custom-http';

@Injectable()
export class GlobalapiService {
    constructor(private http: HttpClient,private customHttp: CustomHttp) { }


past_data_to_server(api_name, params_data)  
{  
        return this.customHttp.post(api_name, params_data)
        .map(resp => {
            return resp;
        })

}    

}