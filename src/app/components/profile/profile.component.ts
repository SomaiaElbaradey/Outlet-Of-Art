import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uploader: FileUploader;
  ngOnChanges(){
    
  }
  constructor(
              private  ProfileService: ProfileService,
              private router: Router
              ) { }
 
  url:string
  userInfo
  userUpdated:{username:string,email:string,password:string,gender:string}
  orders=[]
 
  image
  myForm = new FormGroup({
    username:new FormControl('',[]),
    email:new FormControl('',[]),
    password:new FormControl('',[]),
    gender:new FormControl('',[]),
  })
   ngOnInit(): void {
    this.getInfo()
    this.getOrders()
    
   // console.log(localStorage.getItem('Token'))
  }
 
  onFileChanged(event) {
    this.image = <File>event.target.files[0];
    
    
    let uploadData=new FormData()
    uploadData.append('image', this.image);
   /* uploadData.append('api_key', '688922327779674')
    uploadData.append('upload_preset', 'ml_default')
    uploadData.append('cloud_name', 'ecommerceiti')*/
    
        console.log(this.image)

    this.ProfileService.updateImage(uploadData )
    .subscribe(
      res =>
      {
         this.url=res.body.image;
         console.log(res)
        },
      err => alert(err.error)
    );
  }
  
  getInfo(){
    this.ProfileService.getUserInfo()
    .subscribe(
     async res =>
      {
        this.userInfo=res.body;
        this.url=res.body.image;
         console.log(res)
         console.log(this.userInfo)
        },
      err => alert(err.error)
    );
  }
  updateInfo(){
    if(this.myForm.value)
    {

    console.log(this.myForm.value)
      
      this.ProfileService.updateInfo(this.myForm.value)
      .subscribe(
        async res=>
        {
          this.userInfo=res.body.user
          this.myForm.reset();
        }
        ,err => alert(err.error)
      )
    }
  }

  Cancel(){
    this.myForm.reset();
  }
  getOrders(){
    this.ProfileService.getOrders()
    .subscribe(
     async res =>
      {
        await res.body.forEach(element => this.orders.push(element));
         console.log(res)
        
        },
      err => alert(err.error)
    );
  }
  DeleteUser()
  {
    this.ProfileService.deleteUser()
    .subscribe(
     async res =>
      {
        alert(res)
         console.log(res)
         localStorage.removeItem('Token')
         this.router.navigateByUrl("/register")
        
        },
      err => alert(err.error)
    );
  }
}
