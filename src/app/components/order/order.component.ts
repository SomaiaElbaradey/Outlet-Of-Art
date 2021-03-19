import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css', '../cart/cart.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private route:Router,
    private OrderService: OrderService
  ) { }
  orderFlag:boolean;
  productImg: string = '/assets/img/products/1.png';
  orders: [];
  priceImg: string = '/assets/img/5.png';

  ngOnInit(): void {
    this.OrderService.allOrders().subscribe((response) => {
      this.orders = response;
      if(this.orders.length == 0) this.orderFlag = false;
      else this.orderFlag = true;
    });
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/home');
  }

  //cancel product
  cancelOrder(_order){
    if (confirm(`Are you sure you want to cancel the selected order?`)) {
      this.OrderService.cancelOrder(_order).subscribe(
        () => this.ngOnInit()),
        err => {
          console.log(err);
        }
    }
  }

}
