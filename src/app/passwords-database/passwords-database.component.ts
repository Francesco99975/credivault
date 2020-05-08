import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CredentialModalComponent } from '../credential-modal/credential-modal.component';
import { DatabaseService } from '../services/database.service';
import { MasterModalComponent } from '../master-modal/master-modal.component';
import { ConfirmPasswordModalComponent } from '../confirm-password-modal/confirm-password-modal.component';
import { CredentialsDisplayModalComponent } from '../credentials-display-modal/credentials-display-modal.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-passwords-database',
  templateUrl: './passwords-database.component.html',
  styleUrls: ['./passwords-database.component.scss'],
})
export class PasswordsDatabaseComponent implements OnInit {
  credentials: { owner: string; service: string; credentials: any }[] = [];
  loading: boolean = false;
  currentIndex: number = -1;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private db: DatabaseService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.db
      .readDB()
      .then(() => {
        if (this.db.credentalDatabase.length > 0) {
          this.credentials = this.db.credentalDatabase;
        } else {
          console.log('Empty Databse');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.db.onUpdate.subscribe(() => {
      if (this.db.credentalDatabase.length > 0) {
        this.credentials = this.db.credentalDatabase;
      } else {
        console.log('Empty Databse');
      }
    });

    this.loader.loading2.subscribe((load: boolean) => {
      this.loading = load;
    });
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

  onGet(index: number) {
    this.currentIndex = index;
    if (this.db.masterPassword != '') {
      this.confirm().then(() => {
        if (this.db.confirm) {
          this.db.confirm = false;
          this.api
            .getDecryptedData(this.credentials[index].credentials)
            .subscribe(
              (res: any) => {
                let crd = {
                  owner: this.credentials[index].owner,
                  service: this.credentials[index].service,
                  credentials: {},
                };
                crd.credentials = res;
                this.loader.stopDec();
                this.dialog.open(CredentialsDisplayModalComponent, {
                  height: '500',
                  width: '700',
                  data: {
                    credentials: crd,
                  },
                });
                crd = null;
              },
              (error) => console.log('Error: ' + error.message)
            );
        } else {
          console.log('Access Denied');
        }
      });
    } else {
      this.api
        .getDecryptedData(this.credentials[index].credentials)
        .subscribe((res: any) => {
          let crd = {
            owner: this.credentials[index].owner,
            service: this.credentials[index].service,
            credentials: {},
          };
          crd.credentials = res;
          this.loader.stopDec();
          this.dialog.open(CredentialsDisplayModalComponent, {
            height: '500',
            width: '700',
            data: {
              credentials: crd,
            },
          });
          crd = null;
        });
    }
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
