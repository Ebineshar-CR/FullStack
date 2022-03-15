import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http: HttpClient) { }

  // CONNECTING FRONTEND TO BACKEND..

  apiUrl = 'http://localhost:3005/persons'

  // GET ALL DATA

  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }


  // CREATE DATA

  createData(data: any): Observable<any> {
    console.log(data,'createapi=>');

    return this._http.post(`${this.apiUrl}`, data);
  }

}
