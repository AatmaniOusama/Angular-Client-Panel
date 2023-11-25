import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthClientService,
              private flash: FlashMessagesService,
              private router : Router
              ) { }

  private email: string;
  private password: string;

  ngOnInit() {
  }

  onRegister(){
    this.authService.register(this.email, this.password)
        .then(register => {
            this.flash.show('Account created successfully',{
              cssClash: 'alert-success',
              timeout: 3000
            });
            this.router.navigate(['login']);
        })
        .catch(error => {
          this.flash.show(error.message,{
            cssClash: 'alert-success',
            timeout: 3000
          });
        })
  }

}
