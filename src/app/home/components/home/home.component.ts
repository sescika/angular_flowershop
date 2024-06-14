import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public productArray: any[] = [];
  public images: Array<string>;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
    setTimeout(() => {
      this.getImages();
    }, 1000);
  }
  getAllProducts(): void {
    this.apiService.getAllProducts().subscribe({
      next: (data: Array<any>) => {
        this.productArray = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getImages(): void {
    this.images = this.productArray.map((x) => x.image);
  }
}
