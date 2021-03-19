import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }
  cover01: string = '/assets/img/cover/2.png';
  cover02: string = '/assets/img/cover/1.png';
  cover03: string = '/assets/img/cover/3.png';

  ngOnInit(): void {
  }

}
