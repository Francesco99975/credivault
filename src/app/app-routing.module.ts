import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FastEncryptionComponent } from './fast-encryption/fast-encryption.component';
import { PasswordsDatabaseComponent } from './passwords-database/passwords-database.component';

const routes: Routes = [
  { path: '', redirectTo: '/fast', pathMatch: 'full' },
  {
    path: 'fast',
    component: FastEncryptionComponent,
  },
  { path: 'db', component: PasswordsDatabaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
