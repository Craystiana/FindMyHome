import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterModel } from 'src/app/models/user/register.model';
import { first } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  public isLoading: boolean = false;
  public profile: RegisterModel | undefined;

  constructor(private authService: AuthService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.authService.getProfile().pipe(first()).subscribe(
      data => {
        this.profile = data;
      }
    )
  }

  ionViewWillEnter(){
    this.authService.getProfile().pipe(first()).subscribe(
      data => {
        this.profile = data;
      }
    )
  }
  
  onProfileEdit(profileForm: NgForm){
    this.isLoading = true;
    var model = new RegisterModel(profileForm.value.firstName,
                            profileForm.value.lastName,
                            profileForm.value.email,
                            profileForm.value.address,
                            profileForm.value.phoneNumber
                            );
                          
    this.authService.editProfile(model).pipe(first()).subscribe(
      data =>{
        if(data==true){
          this.router.navigateByUrl('/auth/profile');
          this.toastCtrl.create({
            message: 'Profile updated',
            duration: 5000,
            position: 'bottom',
            color: 'success',
            buttons: ['Dismiss']
          }).then((el) => el.present());
        }
        
        this.isLoading = false;
      },
      error => {
        this.toastCtrl.create({
          message: 'Edit failed',
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
