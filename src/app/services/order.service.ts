import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _HttpClient: HttpClient,
  ) { }
  private baseURL: string = `${environment.api}/api/order/`;

  //get all orders for user
  public allOrders(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}`)
  }

  //get all orders for admin
  public adminOrders(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}/orders`)
  }

  //cancel pending order
  public cancelOrder(id: string): Observable<any> {
    return this._HttpClient
      .delete(`${this.baseURL}/${id}`)
  }

  //change order status for admin
  public orderStatus(id:string, status:string): Observable<any> {
    return this._HttpClient
      .patch(`${this.baseURL}/${id}`, 
      {status},
      { responseType: "text" }
      )
  }
  
}
