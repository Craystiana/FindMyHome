import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  public isLoading: boolean = false;
  public didSubmit: boolean = false;
  public hidePassword: boolean = true;
  
  constructor(private authService: AuthService, private router: Router, private toastCtrl: ToastController) {
    if(this.authService.isAuthenticated()){
      router.navigateByUrl('/home');
    }
  }

  ionViewWillEnter(){
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(loginForm: NgForm) {
    if(loginForm.valid){
      this.isLoading = true;
      this.authService.login(loginForm.value.email, loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if(this.authService.isAuthenticated()){
            this.router.navigateByUrl("/home");
          }
          this.isLoading = false;
          loginForm.resetForm();
        },
        error => {
          this.toastCtrl.create({
            message: 'Email sau parolă greșită',
            duration: 5000,
            position: 'bottom',
            color: 'danger',
            buttons: ['Dismiss']
          }).then((el) => el.present());
          
          this.isLoading = false;
        }
      );
    }    
  }
}
