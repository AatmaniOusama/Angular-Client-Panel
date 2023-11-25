import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {

  id: string;
  client : Client

  constructor(
    private clientService : ClientService,
    private route : ActivatedRoute,
    private flashMessage : FlashMessagesService,
    private router : Router
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    })
  }

  onSubmit(){
    this.client.id = this.id
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client updated seccessfuly !',{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/client', this.id])
    Swal.fire(
      {
        title:'Good job',
        text:'Client updated successfuly',
        type:'success',
        timer:2000
      }
    )
  }
  

}
