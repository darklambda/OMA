import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ProfileComponent } from './profile/profile.component';
import { BulkRegisterComponent } from './bulk-register/bulk-register.component';
import { ExportComponent } from './export/export.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:idUser', component: EditUserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'import', component: BulkRegisterComponent },
  { path: 'export', component: ExportComponent},
  { path: 'list', component: ListViewComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
