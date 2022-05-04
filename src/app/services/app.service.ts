import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public baseURL: String = 'https://api-pahlawankita.herokuapp.com/';
  constructor(private http: HttpClient) {}

  public getQuiz(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'api/quiz');
  }

  public getHeroes(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'api/heroes');
  }

  public getResults(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'api/quiz/results');
  }

  public saveResult(data: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'api/quiz/save', data);
  }
}
