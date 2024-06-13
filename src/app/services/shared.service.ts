import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private storageSub = new BehaviorSubject<boolean>(false);

  watchStorage(): BehaviorSubject<boolean> {
    return this.storageSub;
  }

  lsSetItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    this.storageSub.next(true);
  }

  lsGetItem(key: string): Array<any> {
    return JSON.parse(localStorage.getItem(key) as string) as Array<any>;
  }

  lsRemoveItem(key: string): void {
    localStorage.removeItem(key);
    this.storageSub.next(true);
  }
}
