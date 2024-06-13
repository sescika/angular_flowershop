import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedTotalService {
  private sharedTotal = new BehaviorSubject<any>(0);

  sharedData$ = this.sharedTotal.asObservable();

  updateTotal(newTotal: number) {
    this.sharedTotal.next(newTotal);
  }
}
