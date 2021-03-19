import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private route:Router,
    private CartService: CartService,
  ) { }
  productImg: string = '/assets/img/products/2.png';
  priceImg: string = '/assets/img/4.png';
  emptyCart: boolean = true;
  total: number = 0;
  productIds = [];
  products = [];
  isAdmin: boolean = localStorage.getItem("isAdmin") == "true";

  ngOnInit(): void {
    //get Products for the user
    this.getProducts();
  }
  getProducts(){
    this.CartService.allProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
      if (this.products.length == 0) this.emptyCart = true;
      else this.emptyCart = false;
      //the total price
      this.products.forEach(element => {
        this.total += element.price;
      });
      //product ids to check ouut
      this.products.forEach(element => {
        this.productIds.push(element._id);
      });
    }); 
  }
  //delete Product from cart
  deleteProduct(_product) {
    if (confirm(`Are you sure you want to delete the selected product?`)) {
      this.CartService.deleteProduct(_product).subscribe(
        () => this.ngOnInit()),
        err => {
          console.log(err);
        }
    }
  }

  //add Product to cart
  addProduct(_product) {
    this.CartService.addProduct(
      _product,
    )
      .subscribe(
        response => console.log(response),
        err => console.log(err)
      );
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/home');
  }

  //checkout products to order
  checkout() {
    if (confirm(`Are you sure you want to order?`)) {
      this.CartService.checkout(this.productIds, this.total)
      .subscribe(
        response => {
          console.log(response);
          this.getProducts();
        },
        err => console.log(err)
      );
    }
  }

}