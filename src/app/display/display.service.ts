import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";


const CLIENT_ID = "b067d5cb828ec5a";
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Client-ID ${CLIENT_ID}`
  })
}

@Injectable()
export class DisplayService {

  private SEARCH_BASE_URL = 'https://api.imgur.com/3/gallery/search/';
  private RANDOM_BASE_URL = 'https://api.imgur.com/3/gallery/random/random/';

  constructor(private http: HttpClient) {
  }

  get(page: number = 1, query?: string): Observable<any> {
    if (query) {
      return this.http.get(this.SEARCH_BASE_URL + `${page}?q=${query}`, httpOptions)
        .pipe(catchError(this.handleError));
    }

    return this.http.get(this.RANDOM_BASE_URL + page, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private async handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = await error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
