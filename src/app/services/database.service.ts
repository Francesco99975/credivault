import { Injectable } from '@angular/core';
import { FsService } from 'ngx-fs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  credentalDatabase: Array<{
    owner: string;
    service: string;
    credentials: any;
  }> = [];
  fileSystem: any;
  onUpdate: Subject<void> = new Subject<void>();

  constructor(private fsService: FsService) {
    this.fileSystem = this.fsService.fs;
  }

  readDB() {
    return new Promise((resolve, reject) => {
      try {
        this.fileSystem.readFile(
          'credentials.json',
          (error: any, data: any) => {
            if (error) reject(error);

            this.credentalDatabase = JSON.parse(data);
            resolve();
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  writeDB(data: any) {
    try {
      this.credentalDatabase.push(data);
      this.fileSystem.writeFile(
        'credentials.json',
        JSON.stringify(this.credentalDatabase),
        (error: any) => console.log(error)
      );
      this.onUpdate.next();
    } catch (error) {
      console.log(error);
    }
  }
}
