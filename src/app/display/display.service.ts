import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";

const httpOptions={
  headers : new HttpHeaders({
    'Authorization':'Client-ID b067d5cb828ec5a'
  })
}

@Injectable()
export class DisplayService {

    private displayUrl = 'https://api.imgur.com/3/gallery/search/1/';
    'https://api.imgur.com/3/gallery/search/'

    constructor(private http: HttpClient) {}

    getdata(query: string): Observable<any> {

        return this.http.get(this.displayUrl + "?q=" + query, httpOptions)
          .pipe(catchError(this.handleError));
    }

    private async handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = await error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg =  error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }


}
