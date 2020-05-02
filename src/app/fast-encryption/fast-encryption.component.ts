import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';

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

  constructor(
    private api: ApiService,
    private loader: LoadingService,
    private elemRef: ElementRef
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

  onCopy(payload: string) {
    console.log(`${payload} copied to clipboard!`);
    this.encryptedMessage = '';
    this.decryptedMessage = '';
  }

  onSubmit() {
    this.api
      .getEncryptedData({ data: this.form.get('message').value })
      .subscribe((res: any) => {
        this.encryptedMessage = res.data;
        this.loader.stop();
        this.form.reset();
      });
  }

  onDecrypt() {
    this.api
      .getDecryptedData({ data: this.formDec.get('encryptedMsg').value })
      .subscribe((res: any) => {
        this.decryptedMessage = res.data;
        this.loader.stopDec();
        this.formDec.reset();
      });
  }
}
