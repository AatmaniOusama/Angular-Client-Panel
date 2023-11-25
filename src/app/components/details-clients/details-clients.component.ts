import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-clients',
  templateUrl: './details-clients.component.html',
  styleUrls: ['./details-clients.component.css']
})
export class DetailsClientsComponent implements OnInit {

  id: string;

  client : Client;

  showBalance: boolean=false

  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(clientFound => {
      this.client = clientFound;
      console.log(this.client)
    });
  }

  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('balance updated',{cssClass:'alert-warning' , timeout:3000});
    this.showBalance=false
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
        this.clientService.deleteClient(this.id);
        this.flashMessage.show('Client deleted successfuly', {cssClass:'alert-danger', timeout:3000})
        this.router.navigate(['/']);
        Swal.fire({
          title: 'deleted',
          text: 'Client has been deleted successfuly',
          type: 'warning',
          timer: 3000
        })
      } 
    })
  }

}
