import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css', '../cart/cart.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private route: Router,
    private OrderService: OrderService,
    private modalService: NgbModal
  ) { }
  orderFlag: boolean;
  productImg: string = '/assets/img/products/1.png';
  orders: [];
  priceImg: string = '/assets/img/5.png';
  page: Number = 1;
  totalOrders: number;
  closeResult: string;
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.OrderService.allOrders().subscribe((response) => {
      this.orders = response;
      // console.log(this.orders.length)
      this.totalOrders = this.orders.length;
      if (this.orders.length == 0) this.orderFlag = false;
      else this.orderFlag = true;
    });
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/home');
  }

  //cancel product
  cancelOrder(_order) {
    this.modalService.open(_order, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  order: string;
  orderId(_order) {
    this.order = _order;
  }
  deleteOrder() {
    this.OrderService.cancelOrder(this.order).subscribe(
      () => this.getOrders()),
      err => {
        console.log(err);
      }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
