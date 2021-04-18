import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() loading: boolean = false;
  @Input() httploading: boolean = false;
  ngOnChanges(changes: SimpleChange) {
    console.log(changes); //logging the changes in @Input()
  }
}
