import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Recipe } from './recipes/recipe';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class RecipeService {

  cookbookUrl: string;
  result: Object;

  constructor(private http: HttpClient) {
    this.cookbookUrl = `http://localhost:8080/cookbook/recipe`;
  }

  getRecipes(): Observable<Recipe[]> {

    return this.http.get<Recipe[]>(`${this.cookbookUrl}`, httpOptions);

  }

  deleteRecipe(name: string): Observable<Object> {
    const url = `${this.cookbookUrl}/${name}`;
    return this.http.delete(url, httpOptions);

  }


  postRecipe(recipe: Recipe): Observable<Object> {
    const url = `${this.cookbookUrl}`;
    return this.http.post(url, recipe, httpOptions);
  }
}
