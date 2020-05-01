import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private loader: LoadingService) {}

  getEncryptedData(fields: any) {
    this.loader.start();
    return this.http.post(
      'https://bme-encdec-server.herokuapp.com/encrypt',
      fields
    );
  }
}
