import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getSpanishPaginatorIntl } from './_helpers/spanish-paginator-intl';


import { DatePipe } from '@angular/common'
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BulkRegisterComponent } from './bulk-register/bulk-register.component';
import { ExportComponent } from './export/export.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewPieceComponent } from './new-piece/new-piece.component';
import { PieceListComponent } from './piece-list/piece-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    BulkRegisterComponent,
    ExportComponent,
    ListViewComponent,
    EditUserComponent,
    NewPieceComponent,
    PieceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [authInterceptorProviders,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
