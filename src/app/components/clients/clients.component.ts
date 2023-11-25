import { AuthClientService } from './../../services/auth-client.service';
import { Router } from '@angular/router';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients : Client[];
  total : number = 0 ;
  id: string;
  searchClient: Client[];
  

  constructor(
    private clientService : ClientService,
    private flashMessage : FlashMessagesService,
    private router : Router,
    private authService: AuthClientService
    ) { }


  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      this.clientService.getClients(auth.uid).subscribe(client => {
        this.searchClient = this.clients = client;
        this.total = this.getTotal();
      });
    });
  }

  getTotal(){
   return this.clients.reduce((total, client) => {
     return total + parseFloat(client.balance.toString());
   },0)
  }
  
  removeClient(id: string){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(id);
        this.flashMessage.show('Client deleted successfuly', {cssClass:'alert-danger', timeout:3000})
        this.router.navigate(['/']);
        Swal.fire({
          title: 'deleted',
          text: 'Client has been deleted successfuly',
          type: 'warning',
          timer: 3000
        })
      } 
    });
  }

search(query: string){
  this.searchClient = (query) ? this.clients.filter(client => 
      client.firstName.toUpperCase().includes(query.toUpperCase()) ||
      client.lastName.toUpperCase().includes(query.toUpperCase()) ||
      client.email.toUpperCase().includes(query.toUpperCase()) ||
      (client.balance as unknown as string).includes(query)) : this.clients
  }

}
