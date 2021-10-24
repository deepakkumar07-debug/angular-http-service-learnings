import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-errors';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
// import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private apiUrl2 = 'http://www.omdbapi.com/?apikey=dfe6d885&s=cars';
  constructor(private http: HttpClient) {}

  getPosts() {
    // return this.http.get(this.apiUrl2).toPromise();
    return this.http.get(this.apiUrl);
  }
  createPost(post) {
    return this.http.post(this.apiUrl, JSON.stringify(post)).pipe(
      catchError((error: Response) => {
        if (error.status === 400)
          return Observable.throw(new BadInput(error.json()));

        return Observable.throw(new AppError(error.json()));
      })
    );
  }
  updatePost(post) {
    return this.http.patch(this.apiUrl + '/' + post.id, JSON.stringify(post));
  }

  deletePost(id) {
    return this.http.delete(this.apiUrl + '/' + id).pipe(
      catchError((error: Response) => {
        // if (error.status === 404) return Observable.throw(new NotFoundError());
        if (error.status === 404) return throwError(new NotFoundError());

        // return Observable.throw(new AppError(error));
        return throwError(new AppError(error));
      })
    ); //here we dont have body of the request;
  }
}
