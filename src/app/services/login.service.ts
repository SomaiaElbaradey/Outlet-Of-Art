import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _HttpClient: HttpClient,
  ) { }
  private baseURL: string = `${environment.api}/api/users`

  public loginUser(_user): Observable<any> {
    console.log(_user)
    return this._HttpClient
      .post(
        `${this.baseURL}/userlogin`, _user
      )
  }

  public isLogged() {
    return !!(localStorage.getItem("Token"));
  }

  public isAdmin() {
    return !!(localStorage.getItem("isAdmin"));
  }
}