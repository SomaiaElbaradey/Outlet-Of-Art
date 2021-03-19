import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    constructor(
        private _HttpClient: HttpClient,
      ) { }
      private baseURL: string = `${environment.api}/api/users`

      public addUser(_user): Observable<any> {
        console.log(_user)
        return this._HttpClient
          .post(
            `${this.baseURL}/register`, _user 
          )
      }

}