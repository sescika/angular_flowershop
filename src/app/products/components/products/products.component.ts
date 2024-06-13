import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})  
export class ProductsComponent implements OnInit {
  keyword: string = '';
  checkedCategories: string[] = [];
  constructor(public apiService: ApiService) {}

  public catArr: Array<any>;
  public prodArray: Array<any>;
  public filteredArray: Array<any> = [];

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts(): void {
    this.apiService.getAllProducts().subscribe({
      next: (data) => {
        this.prodArray = data;
        this.filteredArray = this.prodArray;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllCategories(): void {
    this.apiService.getAllCategories().subscribe({
      next: (data) => {
        this.catArr = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCategoryChange(category: string, isChecked: boolean) {
    if (isChecked) {
      this.checkedCategories.push(category);
    } else {
      const idx = this.checkedCategories.indexOf(category);
      if (idx > -1) {
        this.checkedCategories.splice(idx, 1);
      }
    }
    this.filterElements();
  }

  onSearchChange(): void {
    this.filterElements();
  }

  filterElements(): void {
    this.filteredArray = this.prodArray.filter((e) => {
      let matchesCategory, matchesName;

      matchesName =
        this.keyword == '' ||
        e.flower_name.toLowerCase().includes(this.keyword.toLowerCase());

      matchesCategory =
        this.checkedCategories.length === 0 ||
        this.checkedCategories.some((y) => e.categories.includes(y));
      return matchesCategory && matchesName;
    });
  }
}
