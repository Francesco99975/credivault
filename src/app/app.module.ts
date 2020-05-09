import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFsModule } from 'ngx-fs';
import { NgxElectronModule } from 'ngx-electron';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FastEncryptionComponent } from './fast-encryption/fast-encryption.component';
import { PasswordsDatabaseComponent } from './passwords-database/passwords-database.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './message/message.component';
import { CredentialModalComponent } from './credential-modal/credential-modal.component';
import { MasterModalComponent } from './master-modal/master-modal.component';
import { ConfirmPasswordModalComponent } from './confirm-password-modal/confirm-password-modal.component';
import { CredentialsDisplayModalComponent } from './credentials-display-modal/credentials-display-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FastEncryptionComponent,
    PasswordsDatabaseComponent,
    NavigationComponent,
    CopyClipboardDirective,
    MessageComponent,
    CredentialModalComponent,
    MasterModalComponent,
    ConfirmPasswordModalComponent,
    CredentialsDisplayModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    NgxFsModule,
    NgxElectronModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
