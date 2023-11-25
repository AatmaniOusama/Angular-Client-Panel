import { Router } from '@angular/router';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
     private authService : AuthClientService,
     private flash: FlashMessagesService,
     private route: Router
     ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.route.navigate(['/'])
      }
    })

  }

  onLogin(){
    this.authService.login(this.email, this.password)
        .then(auth => {
          this.route.navigate(['/']);
          this.flash.show('Login successfully',{
            cssClass : 'alert-success',
            timeout: 3000
          })
        });
        // .catch(error => {
        //   this.flash.show(error.message,{
        //     cssClass:'alert-danger',
        //     timeout:10000
        //   })
        // })
  }

  onLoginWithGoogle(){
    this.authService.loginWithGoogle(this.email, this.password)
        .then(auth => {
          if(auth){
            this.route.navigate(['/'])
            this.flash.show('Login seccessfully',{
              cssClass:'alert-success',
              timeout:3000
            })
          }
        })
        .catch(error => {
          this.flash.show(error.message,{
            cssClass:'alert-danger',
            timeout:10000
          })
        })
  }

}