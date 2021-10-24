import { DataService } from './data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root',
})
export class PostService extends DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  // private apiUrl2 = 'http://www.omdbapi.com/?apikey=dfe6d885&s=cars';

  // remove private for http
  constructor(http: HttpClient) {
    // first we need to craete DataService object
    super('https://jsonplaceholder.typicode.com/posts', http); // creating instance of base class and passing derived class instance
  }
}
