import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: Subject<boolean> = new Subject<boolean>();
  loading2: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  start() {
    this.loading.next(true);
  }

  startDec() {
    this.loading2.next(true);
  }

  stop() {
    this.loading.next(false);
  }

  stopDec() {
    this.loading2.next(false);
  }
}
