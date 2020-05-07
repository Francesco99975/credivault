import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CredentialModalComponent } from '../credential-modal/credential-modal.component';
import { DatabaseService } from '../services/database.service';
import { MasterModalComponent } from '../master-modal/master-modal.component';

@Component({
  selector: 'app-passwords-database',
  templateUrl: './passwords-database.component.html',
  styleUrls: ['./passwords-database.component.scss'],
})
export class PasswordsDatabaseComponent implements OnInit {
  credentials: { owner: string; service: string; credentials: any }[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    this.db
      .readDB()
      .then(() => {
        if (this.db.credentalDatabase.length > 0) {
          console.log(this.db.credentalDatabase);
          this.credentials = this.db.credentalDatabase;
        } else {
          console.log(this.db.credentalDatabase);
          console.log('Empty Databse');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.db.onUpdate.subscribe(() => {
      if (this.db.credentalDatabase.length > 0) {
        console.log(this.db.credentalDatabase);
        this.credentials = this.db.credentalDatabase;
      } else {
        console.log(this.db.credentalDatabase);
        console.log('Empty Databse');
      }
    });
  }

  onGet(index: number) {
    console.log('getting credentials');
  }

  onDelete(index: number) {
    this.db.removeFromDB(index);
  }

  onAdd() {
    this.dialog.open(CredentialModalComponent, {
      height: '500',
      width: '700',
    });
  }

  onSetMaster() {
    this.dialog.open(MasterModalComponent, {
      height: '500',
      width: '700',
    });
  }
}
