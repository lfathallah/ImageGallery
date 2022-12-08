import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";
import {CLIENT_ID, RANDOM_BASE_URL, SEARCH_BASE_URL} from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Client-ID ${CLIENT_ID}`
  })
}

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get a page of images from the server either randomly if there are no search keywords (reprensented by the query parameter)
   * or only those matching the search query keywords
   * @param page : the page number of the images to get
   * @param query: the search keywords
   */
  get(page: number = 1, query?: string): Observable<any> {
    if (query) {
      console.log(`Searching all images matching query "${query}"`)
      return this.http.get(SEARCH_BASE_URL + `${page}?q=${query}`, httpOptions)
        .pipe(catchError(this.handleError));
    }

    console.log(`Getting random images from ${RANDOM_BASE_URL}`)
    return this.http.get(RANDOM_BASE_URL + page, httpOptions)
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
    console.log(`AN ERROR OCCURRED...`)
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
