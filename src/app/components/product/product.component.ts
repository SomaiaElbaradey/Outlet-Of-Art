import {Component,OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-product',
    templateUrl:'./product.component.html'
})

export class ProductComponent  implements OnInit{
    
    constructor(private http: HttpClient){}
    ngOnInit(): void {
        this.getAllProducts();
    }
    getAllProducts(){
       
    }
}