import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-confirm-password-modal',
  templateUrl: './confirm-password-modal.component.html',
  styleUrls: ['./confirm-password-modal.component.scss'],
})
export class ConfirmPasswordModalComponent implements OnInit {
  form = new FormGroup({
    password: new FormControl(null, Validators.required),
  });

  loading: boolean = false;

  constructor(
    private db: DatabaseService,
    private dialogRef: MatDialogRef<ConfirmPasswordModalComponent>,
    private dialog: MatDialog,
    private api: ApiService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.loader.loading2.subscribe((load: boolean) => {
      this.loading = load;
    });
  }

  onSubmit() {
    this.api
      .getDecryptedData({ data: this.db.masterPassword })
      .subscribe((res: any) => {
        if (this.form.get('password').value === res.data) {
          this.db.confirm = true;
          this.loader.stopDec();
          this.close();
        } else {
          this.loader.stopDec();
          this.dialog.open(MessageComponent, {
            data: {
              message: 'Invalid Master Password! Try Again...',
            },
          });
          this.form.reset();
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
