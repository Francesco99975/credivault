import { Component, Inject, Injectable, OnInit } from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { DatabaseService } from '../services/database.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-master-modal',
  templateUrl: './master-modal.component.html',
  styleUrls: ['./master-modal.component.scss'],
})
export class MasterModalComponent implements OnInit {
  encryptedMaster: string = '';
  previous: boolean = false;
  form = new FormGroup({
    prev: new FormControl(null),
    master: new FormControl(null, Validators.required),
  });
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<MasterModalComponent>,
    private api: ApiService,
    private db: DatabaseService,
    private dialog: MatDialog,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    if (this.db.masterPassword != '') this.previous = true;

    this.loader.loading.subscribe((load: boolean) => {
      this.loading = load;
    });
  }

  generateRandomPassword() {
    this.api.getRandomPassword().subscribe(
      (pass: any) => {
        this.form.value.master = pass.randomPassword;
        this.loader.stop();
      },
      (error) => {
        this.loader.stop();
        console.log(error.error);
        this.dialog.open(MessageComponent, {
          data: {
            message: error.error,
          },
        });
      }
    );
  }

  onCopy(cp: string) {
    this.encryptedMaster = '';
  }

  onSubmit() {
    if (this.previous) {
      this.loader.start();
      this.api.getDecryptedData({ data: this.db.masterPassword }).subscribe(
        (res: any) => {
          if (this.form.get('prev').value === res.data) {
            this.api
              .getEncryptedData({ data: this.form.get('master').value })
              .subscribe((res: any) => {
                this.db
                  .writeMasterPassword(res.data)
                  .then(() => {
                    this.encryptedMaster = this.db.masterPassword;
                    this.loader.stop();
                  })
                  .catch((error) => console.log(error));
              });
          } else {
            this.loader.stop();
            this.dialog.open(MessageComponent, {
              data: {
                message: 'Wrong Password Try Again...',
              },
            });
            this.form.reset();
          }
        },
        (error) => {
          this.loader.stop();
          console.log(error.error);
          this.dialog.open(MessageComponent, {
            data: {
              message: error.error,
            },
          });
        }
      );
    } else {
      this.api
        .getEncryptedData({ data: this.form.get('master').value })
        .subscribe(
          (res: any) => {
            this.db
              .writeMasterPassword(res.data)
              .then(() => {
                this.encryptedMaster = this.db.masterPassword;
                this.loader.stop();
              })
              .catch((error) => console.log(error));
          },
          (error) => {
            this.loader.stop();
            console.log(error.error);
            this.dialog.open(MessageComponent, {
              data: {
                message: error.error,
              },
            });
          }
        );
    }
  }

  onReset() {
    this.db.writeMasterPassword('');
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
