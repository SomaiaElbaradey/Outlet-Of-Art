import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private CartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  deleteProduct(_product) {
    if (confirm(`Are you sure you want to delete the selected product?`)) {
      this.CartService.deleteProduct(_product).subscribe(
        () => this.ngOnInit()),
        err => {
          console.log(err);
        }
    }
  }

}
