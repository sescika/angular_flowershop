import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-slider',
  templateUrl: './auto-slider.component.html',
  styleUrl: './auto-slider.component.css',
})
export class AutoSliderComponent implements OnInit{
  @Input() images: Array<any>;

  ngOnInit(): void {
    console.log(this.images)
  }
}
