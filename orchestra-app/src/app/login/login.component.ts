import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form2: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  admin = false;

  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.admin = this.tokenStorage.getUser().admin;
      this.router.navigate(['home']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.form2;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.admin = this.tokenStorage.getUser().admin;
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      },
      err => {
        this.errorMessage = err.error.message;
        this.snackbar.open('Inicio de Sesión Fallido', '', {
          panelClass: 'center',
          duration: 2000
        });
        this.isLoginFailed = true;
      }
    );
  }
}