import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  start() {
    this.loading.next(true);
  }

  stop() {
    this.loading.next(false);
  }
}
