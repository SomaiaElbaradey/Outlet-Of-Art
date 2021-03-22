import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpRequest  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Gallery } from '../gallery';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  addProperty(formData: FormData) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private _HttpClient: HttpClient,
  ) { }
  private baseURL: string = `${environment.api}/api/cart/`

  //get all products in user cart
  public allProducts(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}`)
  }

  //delete one product from cart
  public deleteProduct(id: string): Observable<any> {
    return this._HttpClient
      .delete(`${this.baseURL}/${id}`)
  }

  //add product to cart
  public addProduct(_product: string): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}`,
        { _product },
        { responseType: "text" }
      )
  }

  //checkout to order
  public checkout(_product, totalPrice): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}checkout`,
        { _product, totalPrice },
        { responseType: "text" }
      )
  }

  ///
  public get(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}image`)
  }

}