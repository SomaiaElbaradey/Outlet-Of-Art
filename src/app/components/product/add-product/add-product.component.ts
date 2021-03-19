import { Component, ElementRef, OnInit,ViewChild,EventEmitter, Output  } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css', '../product.component.css', '../../cart/cart.component.css']
})
export class AddProductComponent implements OnInit {
  image = null;
  title = "";
  details = "";
  price = "";
  isAdded = null;
  addProductError = null;
  titleError = "";
  priceError = "";
  detailsError = "";
  imgError = "";
  @Output() addProductEvent = new EventEmitter();
  token = localStorage.getItem("Token");
  @ViewChild('productImage')
  productImage: ElementRef;
  constructor(private http: HttpClient) { 
  }
  ngOnInit(): void {
  }
  addProduct(event){
    event.preventDefault();
    event.target.value = "Wait...";
    event.target.disabled = true;

    const formData = new FormData();
    formData.append("image",this.image);
    formData.append("price",this.price);
    formData.append("details",this.details);
    formData.append("title",this.title);
    if(this.checkInputs(event)){
        this.http.post(environment.api+'/api/product/add',formData,{
            headers: new HttpHeaders()
                .set('user-token',this.token),
                
            })
            .subscribe(  res =>{
              this.image = "";
              this.title = "";
              this.details = "";
              this.price = "";
              this.productImage.nativeElement.value = "";
              this.isAdded = true;
              setTimeout(()=>{
                this.isAdded = null;
              },3000);
              this.addProductEvent.emit(Object.values(res)[1]);
              event.target.value = "Add";
              event.target.disabled = false;
            }
            ,
            err=>{
                this.isAdded = false;
                this.addProductError ="Failed to add product try again later !";
                event.target.value = "Add";
                event.target.disabled = false;
            })
         
        }
   
  }
  onSelectFile(event){
    this.image = <File>event.target.files[0];
  }
  checkTitle(){
    if(this.title.trim().length < 5 ){
      this.titleError = "Title must be at least 5 characters!";
    }else{
        this.titleError = "";
    }
  }
  checkPrice(){
    if( !parseFloat(this.price) || parseFloat(this.price) < 0){
      this.priceError = "Inavalid price";
    }else{
      this.priceError = "";
    }
    
  }
  checkDetails(){
    if(this.details.trim().length < 5){
      this.detailsError = "Title must be at least 5 characters!";
    }else{
      this.detailsError = "";
    }
  }
  checkImage(){
    if(this.image == null ){
      this.imgError = "You must upload an image";
    }
    let imgEtention = this.image.name.split(".")[1].toLowerCase();
    if(imgEtention != "png" && imgEtention != "jpg" && imgEtention != "jpeg" ){
      this.imgError = "Invalid image format must be jpg , png or jpeg";
    }else{
      this.imgError = "";
    }
  }
  checkInputs(event){
    this.checkTitle();
    this.checkPrice();
    this.checkDetails();
    this.checkImage();
    if(this.titleError == "" && this.priceError == "" && this.detailsError == "" && this.imgError == "")
      return true;
    
    return false;
  }

}
