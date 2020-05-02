import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-fast-encryption',
  templateUrl: './fast-encryption.component.html',
  styleUrls: ['./fast-encryption.component.scss'],
})
export class FastEncryptionComponent implements OnInit {
  form = new FormGroup({
    message: new FormControl(null, Validators.required),
  });

  encryptedMessage: string = '';
  loading: boolean = false;

  constructor(private api: ApiService, private loader: LoadingService) {}

  ngOnInit(): void {
    this.loader.loading.subscribe((load: boolean) => {
      this.loading = load;
    });
  }

  onCopy(payload: string) {
    console.log(`${payload} copied to clipboard!`);
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
}
