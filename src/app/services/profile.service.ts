import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _HttpClient: HttpClient,
  ) { }
  private baseURL: string = `${environment.api}/api/users`
  private orderURL: string = `${environment.api}/api/order`

  public updateImage(_image): Observable<any> {
    console.log(_image)
    return this._HttpClient
      .patch(
        `${this.baseURL}/image`, _image, {
        headers: new HttpHeaders()
        .set('user-token', localStorage.getItem('Token'))
        , observe: 'response'
      }
      )
  }
  public updateInfo(_user): Observable<any> {
    return this._HttpClient
      .patch(
        `${this.baseURL}/update`, _user, {
        headers: new HttpHeaders()
          .set('user-token', localStorage.getItem('Token'))
        , observe: 'response'
      }
      )
  }
  public getUserInfo(): Observable<any> {
    return this._HttpClient
      .get(
        `${this.baseURL}`, {
        headers: new HttpHeaders()
          .set('user-token', localStorage.getItem('Token')

          )
        , observe: 'response',

      }
      )
  }
  public getOrders(): Observable<any> {
    return this._HttpClient
      .get(`${this.orderURL}`,
        {
          headers: new HttpHeaders()
            .set('user-token', localStorage.getItem('Token')

            )
          , observe: 'response',

        }

      )
  }

  public deleteUser(): Observable<any> {
    return this._HttpClient
      .delete(`${this.baseURL}/delete`,
        {
          headers: new HttpHeaders()
            .set('user-token', localStorage.getItem('Token')

            )
          , observe: 'response',

        }

      )
  }
}