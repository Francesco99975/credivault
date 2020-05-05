import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CredentialModalComponent } from '../credential-modal/credential-modal.component';

@Component({
  selector: 'app-passwords-database',
  templateUrl: './passwords-database.component.html',
  styleUrls: ['./passwords-database.component.scss'],
})
export class PasswordsDatabaseComponent implements OnInit {
  credentials: { owner: string; service: string; fields: any[] }[];

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    //Storage Get
  }

  onGet(index: number) {
    console.log('getting credentials');
  }

  onDelete(index: number) {
    console.log('deleting credentials');
  }

  onAdd() {
    this.dialog.open(CredentialModalComponent, {
      height: '500',
      width: '700',
    });
  }
}
