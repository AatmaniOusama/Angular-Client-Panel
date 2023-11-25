import { AuthClientService } from './../../services/auth-client.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {

  client : Client = {
    firstName : "",
    lastName : "",
    email : "",
    phone : null,
    balance : 0,
    user: ''
  }


  constructor(
     private clientService : ClientService,
     private route : Router, 
     private flashMessage: FlashMessagesService,
     private authService: AuthClientService

     ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth => {
      this.client.user = auth.uid;
    })

  }

  onSubmit(){
    this.clientService.newClient(this.client);
    this.flashMessage.show("Client added seccessfuly", {cssClass:'alert-primary' ,timeout:3000});
    this.route.navigate(['/']);
    Swal.fire(
      {
        title:'Good job',
        text:'Client added successfuly',
        type:'success',
        timer:2000
      }
    )

  }

}
