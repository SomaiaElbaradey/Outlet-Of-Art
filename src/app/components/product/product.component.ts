import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css', '../cart/cart.component.css']
})

export class ProductComponent implements OnInit {
    token = localStorage.getItem("Token");
    isAdmin: boolean = localStorage.getItem("isAdmin") == "true";
    isAdding: boolean;
    totalProducts: number;
    products = [];
    productImg: string = '/assets/img/products/2.png';
    page: Number = 1;
    constructor(
        private http: HttpClient,
        private ProductService: ProductService,
        private CartService: CartService,
    ) { }
    ngOnInit(): void {
        this.isAdding = false;
        this.getAllProducts();
        console.log(this.isAdmin);
    }
    getAllProducts() {
        this.ProductService.allProducts().subscribe((response) => {
            console.log(response)
            this.products = response['products'];
            this.totalProducts = this.products.length;
        }),
            err => {
                console.log(err);
            };
    }
    //Comes from add-product component
    addProductEvent(event) {
        this.products.push(event);
    }
    removeProduct(productId, index) {

        const sure = confirm("Are you sure to delete this product ?");

        if (sure == true) {
            this.http.delete(environment.api + '/api/product/' + productId)
                .subscribe(res => {
                    console.log(index);
                    this.products.splice(index, 1);
                },
                err => {
                    console.log(err)
                })
        }
    }

    addCart(id) {
        this.CartService.addProduct(id).subscribe(Response => {
            console.log(Response)
        }),
            err => console.log(err)
    }
}