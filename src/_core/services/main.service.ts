import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private readonly serverUrl = 'https://localhost:44336/api';

  constructor(private httpClient: HttpClient) { }

  register(body: any): Observable<any> {
    return this.httpClient.post('https://localhost:44336/user/register', body);
  }

  login(body: any): Observable<any> {
    return this.httpClient.post('https://localhost:44336/user/login', body);
  }

  insertUserRating(body: any): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/Rating/InsertUserRating', body);
  }

  getAllAnimeListById(userId: string): Observable<any> {
    return this.httpClient.get('https://localhost:44336/api/GetAnimeList/getAnimeListById/' + userId);
  }

  updateViewRecord(body: any): Observable<any> {
    return this.httpClient.put(this.serverUrl + '/ViewRecord/UpdateViewRecord', body);
  }

  getTopAnimeList(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/GetAnimeList/getAnimeList');
  }

  getTopGenres(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/Genres/getTopGenres');
  }

  getMoreInfo(): Observable<any> {
    return this.httpClient.get('https://localhost:44336/anime/GetMoreInfo');
  }

  InsertViewRecord(body: any): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/ViewRecord/InsertViewRecord', body);
  }


  deleteAnime(animeName: string, userId: string): Observable<any> {
    const params = { animeName, userId };
    return this.httpClient.delete(this.serverUrl + '/ViewRecord/DeleteViewRecord', { params });
  }

  getAllAnimeList(): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/GetAnimeList/getAllAnimeList');
  }

  getViewRecordByAnimeName(animeName: string, userId: string): Observable<any> {
    const params = { animeName, userId };
    return this.httpClient.get(this.serverUrl + '/ViewRecord/GetViewRecordByAnimeName/' + animeName, { params });
  }



}
