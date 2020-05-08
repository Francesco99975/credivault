import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { ConfirmPasswordModalComponent } from '../confirm-password-modal/confirm-password-modal.component';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-fast-encryption',
  templateUrl: './fast-encryption.component.html',
  styleUrls: ['./fast-encryption.component.scss'],
})
export class FastEncryptionComponent implements OnInit, AfterViewInit {
  form = new FormGroup({
    message: new FormControl(null, Validators.required),
  });

  formDec = new FormGroup({
    encryptedMsg: new FormControl(null, Validators.required),
  });

  encryptedMessage: string = '';
  decryptedMessage: string = '';
  loading: boolean = false;
  loading2: boolean = false;
  errorMsg: string = '';

  constructor(
    private api: ApiService,
    private loader: LoadingService,
    private elemRef: ElementRef,
    private dialog: MatDialog,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    this.loader.loading.subscribe((load: boolean) => {
      this.loading = load;
    });

    this.loader.loading2.subscribe((load: boolean) => {
      this.loading2 = load;
    });
  }

  ngAfterViewInit() {
    this.elemRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#0277bd';
  }

  private confirm() {
    return new Promise((resolve) => {
      this.dialog
        .open(ConfirmPasswordModalComponent, {
          height: '500',
          width: '700',
        })
        .afterClosed()
        .subscribe(() => {
          resolve();
        });
    });
  }

  onCopy(payload: string) {
    console.log(`${payload} copied to clipboard!`);
    this.encryptedMessage = '';
    this.decryptedMessage = '';
  }

  onSubmit() {
    this.api
      .getEncryptedData({ data: this.form.get('message').value })
      .subscribe(
        (res: any) => {
          this.encryptedMessage = res.data;
          this.loader.stop();
          this.form.reset();
        },
        (error) => {
          this.errorMsg = error.error.error;
          this.loader.stop();
          this.form.reset();
          this.dialog.open(MessageComponent, {
            data: {
              message: this.errorMsg,
            },
          });
        }
      );
  }

  onDecrypt() {
    if (this.db.masterPassword != '') {
      this.confirm().then(() => {
        if (this.db.confirm) {
          this.db.confirm = false;
          this.api
            .getDecryptedData({ data: this.formDec.get('encryptedMsg').value })
            .subscribe(
              (res: any) => {
                this.decryptedMessage = res.data;
                this.loader.stopDec();
                this.formDec.reset();
              },
              (error) => {
                this.errorMsg = error.error;
                this.loader.stopDec();
                this.formDec.reset();
                this.dialog.open(MessageComponent, {
                  data: {
                    message: this.errorMsg,
                  },
                });
              }
            );
        } else {
          console.log('Access Denied');
        }
      });
    } else {
      this.api
        .getDecryptedData({ data: this.formDec.get('encryptedMsg').value })
        .subscribe(
          (res: any) => {
            this.decryptedMessage = res.data;
            this.loader.stopDec();
            this.formDec.reset();
          },
          (error) => {
            this.errorMsg = error.error;
            this.loader.stopDec();
            this.formDec.reset();
            this.dialog.open(MessageComponent, {
              data: {
                message: this.errorMsg,
              },
            });
          }
        );
    }
  }
}
