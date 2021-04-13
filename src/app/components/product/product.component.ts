import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css', '../cart/cart.component.css'],
})
export class ProductComponent implements OnInit {
  productsImages = [
    '/assets/img/pro/1.jpg',
    '/assets/img/pro/2.jpg',
    '/assets/img/pro/3.jpg',
    '/assets/img/pro/4.jpg',
    '/assets/img/pro/5.jpg',
    '/assets/img/pro/6.jpg',
    '/assets/img/pro/7.jpg',
    '/assets/img/pro/8.jpg',
    '/assets/img/pro/19.jpg',
    '/assets/img/pro/10.jpg',
    '/assets/img/pro/11.jpg',
    '/assets/img/pro/12.jpg',
    '/assets/img/pro/20.jpg',
    '/assets/img/pro/21.jpg',
    '/assets/img/pro/15.jpg',
    '/assets/img/pro/22.jpg',
    '/assets/img/pro/17.jpg',
    '/assets/img/pro/18.jpg',
    '/assets/img/pro/23.jpg',
  ];
  token = localStorage.getItem('Token');
  isAdmin: boolean = localStorage.getItem('isAdmin') == 'true';
  user: boolean = localStorage.getItem('Token') != null;
  isAdding: boolean;
  totalProducts: number;
  products = [];
  allProducts = [];
  productImg: string = '/assets/img/products/2.png';
  page: Number = 1;
  closeResult: string;
  isLoading = false;
  constructor(
    private http: HttpClient,
    private ProductService: ProductService,
    private CartService: CartService,
    private modalService: NgbModal,
    private notifyService: NotificationService
  ) {}
  ngOnInit(): void {
    this.isAdding = false;
    this.getAllProducts();
  }
  getAllProducts() {
    this.isLoading = true;
    this.ProductService.allProducts().subscribe((response) => {
      this.allProducts = response['products'];
      this.products = this.allProducts;
      this.totalProducts = this.products.length;
      this.isLoading = false;
    }),
      (err) => {
        console.log(err);
      };
  }

  //Comes from add-product component
  addProductEvent(event) {
    this.products.push(event);
  }

  //remove product by id
  removeProduct(productId, index) {
    this.modalService
      .open(productId, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  productId;
  index;
  proId(_product, _index) {
    this.productId = _product;
    this.index = _index;
  }
  deleteProduct() {
    this.http
      .delete(environment.api + '/api/product/' + this.productId)
      .subscribe(
        (res) => this.getAllProducts(),
        (err) => console.log(err)
      );
  }

  //add product to user cart
  addCart(id) {
    if(!this.user){
      this.notifyService.showInfo(
        'Please Sign In to add Product to your cart ',
        'Sign In'
      );
    } else {
        this.CartService.addProduct(id).subscribe((Response) => {
      this.notifyService.showSuccess(
        'Product added to your cart successfuly ',
        'Added to cart'
      );
    }),
      (err) => console.log(err);
    }
  }

  //search for product
  search(e) {
    this.products = this.allProducts;
    this.products = this.allProducts.filter((element) => {
      return element.title.toLowerCase().includes(e.value.toLowerCase());
    });
  }

  //open image
  image: string;
  img_index=0;
  imageId(_image, i) {
    this.image = _image;
    this.img_index = i;
  }
  openImage(_image) {
    this.modalService
      .open(_image, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
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
