import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css', '../cart/cart.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private route:Router) { }
  productImg: string = '/assets/img/3.png';

  ngOnInit(): void {
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/home');
  }
}
