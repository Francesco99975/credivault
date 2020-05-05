import { Component, Inject, Injectable, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';

@Component({
  templateUrl: 'credential-modal.component.html',
})
export class CredentialModalComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CredentialModalComponent>,
    private api: ApiService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.loader.loading.subscribe((load: boolean) => {
      this.loading = load;
    });
  }

  private initForm() {
    let cfields = new FormArray([]);
    cfields.push(
      new FormGroup({
        field: new FormControl(null, Validators.required),
        credential: new FormControl(null, Validators.required),
      })
    );

    this.form = new FormGroup({
      owner: new FormControl(null, Validators.required),
      service: new FormControl(null, Validators.required),
      fields: cfields,
    });
  }

  get fields() {
    return (this.form.get('fields') as FormArray).controls;
  }

  onAddField() {
    (<FormArray>this.form.get('fields')).push(
      new FormGroup({
        field: new FormControl(null, Validators.required),
        credential: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteField(index: number) {
    (<FormArray>this.form.get('fields')).removeAt(index);
  }

  public onSubmit() {
    let creds = {};

    for (let i = 0; i < this.form.get('fields').value.length; i++) {
      creds[this.form.get('fields').value[i].field] = this.form.get(
        'fields'
      ).value[i].credential;
    }

    let data = {
      owner: this.form.get('owner').value,
      service: this.form.get('service').value,
      credentials: creds,
    };

    this.api.getEncryptedData(data.credentials).subscribe((res: any) => {
      data.credentials = res;
      console.log(data);
      this.loader.stop();
      this.dialogRef.close();
    });
  }
}
