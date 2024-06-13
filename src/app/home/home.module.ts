import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AutoSliderComponent } from './components/auto-slider/auto-slider.component';


@NgModule({
  declarations: [
    HomeComponent,
    AutoSliderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
