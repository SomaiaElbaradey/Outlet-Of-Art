import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }
  img01:string = '/assets/about/1.png';
  img02:string = '/assets/about/2.png';
  img03:string = '/assets/about/3.png';
  img04:string = '/assets/about/4.png';
  
  ngOnInit(): void {
  }

}
