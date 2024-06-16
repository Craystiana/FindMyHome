import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { first, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { RegisterModel } from 'src/app/models/user/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router, private toastCtrl: ToastController) { }

  ionViewWillEnter() {
  }

  onRegister(registerForm: NgForm) {
    this.isLoading = true;
    var model = new RegisterModel(registerForm.value.firstName,
                                  registerForm.value.lastName,
                                  registerForm.value.email,
                                  registerForm.value.password,
                                  registerForm.value.phoneNumber);

    this.authService.register(model).pipe(first()).subscribe(
      data => {
        if (data == true) {
          this.router.navigateByUrl('/auth');
          this.toastCtrl.create({
            message: 'Înregistrare reușită. Conectează-te.',
            duration: 5000,
            position: 'bottom',
            color: 'success',
            buttons: ['Dismiss']
          }).then((el) => el.present());
        }
        else {
          this.toastCtrl.create({
            message: 'Înregistrare eșuată',
            duration: 5000,
            position: 'bottom',
            color: 'danger',
            buttons: ['Dismiss']
          }).then((el) => el.present());
        }
        this.isLoading = false;
      },
      error => {
        this.toastCtrl.create({
          message: 'Înregistrare eșuată',
          duration: 5000,
          position: 'bottom',
          color: 'danger',
          buttons: ['Dismiss']
        }).then((el) => el.present());

        this.isLoading = false;
      }
    )
  }
}
