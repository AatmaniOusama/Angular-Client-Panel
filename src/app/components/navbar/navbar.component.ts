import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;
  userLoggedIn: string;

  constructor(
    private authService: AuthClientService,
    private flash: FlashMessagesService,
    private route: Router) { }

  ngOnInit() {
    
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLogged = true;
        this.userLoggedIn = auth.email;
      } else{
        this.isLogged = false;
      }
    })

  }

  onLogOut(){
    this.authService.logout();
    this.flash.show('Logout done',{
      cssClass: 'alert-danger',
      timeout:3000
    })
    this.route.navigate(['/login']);
  }

}
