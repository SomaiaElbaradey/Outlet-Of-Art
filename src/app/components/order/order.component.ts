import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css', '../cart/cart.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(
    private route: Router,
    private OrderService: OrderService,
    private modalService: NgbModal,
    private notifyService: NotificationService
  ) {}
  orderFlag: boolean;
  productImg: string = '/assets/img/products/1.png';
  orders: [];
  priceImg: string = '/assets/img/5.png';
  page: Number = 1;
  totalOrders: number;
  closeResult: string;
  isLoading = true;

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.isLoading = true;
    this.OrderService.allOrders().subscribe((response) => {
      this.orders = response;
      // console.log(this.orders.length)
      this.totalOrders = this.orders.length;
      if (this.orders.length == 0) this.orderFlag = false;
      else this.orderFlag = true;
      this.isLoading = false;
    });
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/home');
  }

  //cancel product
  cancelOrder(_order) {
    this.modalService
      .open(_order, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  order: string;
  orderId(_order) {
    this.order = _order;
  }
  deleteOrder() {
    this.OrderService.cancelOrder(this.order).subscribe(() => {
      this.getOrders();
      this.notifyService.showInfo('Order has been canceled', 'Cancel order');
    }),
      (err) => {
        console.log(err);
      };
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
