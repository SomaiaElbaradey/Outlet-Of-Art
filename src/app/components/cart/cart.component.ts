import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private route: Router,
    private CartService: CartService,
    private modalService: NgbModal,
    private notifyService: NotificationService
  ) {}
  productsImages = [
    '/assets/img/pro/1.jpg',
    '/assets/img/pro/2.jpg',
    '/assets/img/pro/3.jpg',
  ];
  
  productImg: string = '/assets/img/products/2.png';
  priceImg: string = '/assets/img/4.png';
  emptyCart: boolean = true;
  total: number = 0;
  productIds = [];
  products = [];
  isAdmin: boolean = localStorage.getItem('isAdmin') == 'true';
  page: Number = 1;
  totalProducts: number;
  closeResult: string;
  isLoading = true;
  ngOnInit(): void {
    //get Products for the user
    this.getProducts();
  }
  getProducts() {
    this.isLoading = true;
    this.CartService.allProducts().subscribe((response) => {
      this.total = 0;
      this.products = response;
      this.totalProducts = this.products.length;
      if (this.products.length == 0) this.emptyCart = true;
      else this.emptyCart = false;
      //the total price
      this.products.forEach((element) => {
        this.total += element.price;
      });
      //product ids to check ouut
      this.products.forEach((element) => {
        this.productIds.push(element._id);
      });
    });
    this.isLoading = false;
  }

  //delete Product from cart
  deleteProduct(_product) {
    this.modalService
      .open(_product, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  _product: string;
  productId(product) {
    this._product = product;
  }
  deleteTheProduct() {
    this.CartService.deleteProduct(this._product).subscribe(
      (res) => {
        this.notifyService.showInfo(
          'Product has been deleted from your cart',
          'Delete cart product'
        );
        this.getProducts();
        this.route.navigateByUrl('/cart');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //add Product to cart
  addProduct(_product) {
    this.CartService.addProduct(_product).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/home');
  }

  //checkout products to order
  checkout(_order) {
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
  checkoutOrder() {
    this.CartService.checkout(this.productIds, this.total).subscribe(
      (response) => {
        this.notifyService.showSuccess(
          'Products has been ordered successfully',
          'Make Order'
        );
        this.total = 0;
        this.route.navigateByUrl('/cart');
        this.getProducts();
      },
      (err) => console.log(err)
    );
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
