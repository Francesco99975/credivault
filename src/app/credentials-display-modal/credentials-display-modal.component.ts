import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-credentials-display-modal',
  templateUrl: './credentials-display-modal.component.html',
  styleUrls: ['./credentials-display-modal.component.scss'],
})
export class CredentialsDisplayModalComponent implements OnInit, OnDestroy {
  owner: string;
  service: string;
  credentials: any;

  constructor(
    private dialogRef: MatDialogRef<CredentialsDisplayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.owner = data.credentials.owner;
    this.service = data.credentials.service;
    this.credentials = data.credentials.credentials;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.owner = null;
    this.service = null;
    this.credentials = null;
    this.data = null;
  }

  close() {
    this.dialogRef.close();
  }
}
