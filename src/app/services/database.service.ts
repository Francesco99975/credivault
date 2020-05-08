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
  masterPassword: string = '';
  confirm: boolean = false;

  constructor(private fsService: FsService) {
    this.fileSystem = this.fsService.fs;
    this.readMasterPassword()
      .then(() => {
        console.log('got master password');
      })
      .catch((error) => {
        this.masterPassword = '';
      });
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

  readMasterPassword() {
    return new Promise((resolve, reject) => {
      this.fileSystem.readFile(
        'master.dat',
        'utf8',
        (error: any, data: any) => {
          if (error) reject(error);

          this.masterPassword = data;
          resolve();
        }
      );
    });
  }

  removeFromDB(index: number) {
    try {
      this.credentalDatabase.splice(index, 1);
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

  writeMasterPassword(master: string) {
    return new Promise((resolve, reject) => {
      try {
        this.masterPassword = master;
        this.fileSystem.writeFile('master.dat', master, (error: any) =>
          reject(error)
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
