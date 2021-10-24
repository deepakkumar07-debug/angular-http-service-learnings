import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppError } from '../common/app-errors';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { Inject } from '@angular/core';

// import 'rxjs/add/observable/throw';
//  we can even remove injectable and also @Inject(String) in constructor
@Injectable({
  providedIn: 'root',
})
export class DataService {
  //  this class gonnabe reusable so here we dont need intialization
  constructor(@Inject(String) private url: string, private http: HttpClient) {}
  //  instead of getPosts getAll
  getAll() {
    // return this.http.get(this.apiUrl2).toPromise();
    return this.http.get(this.url).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }
  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource)).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }
  update(resource) {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify(resource))
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }
  //  delete always take id so we dont need to rename param
  delete(id) {
    return this.http.delete(this.url + '/' + id).pipe(
      map((response) => response),
      catchError(this.handleError) // simply passing reference
    ); //here we dont have body of the request;
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404) return throwError(new NotFoundError());

    // return Observable.throw(new AppError(error));
    return throwError(new AppError(error));
  }
}
