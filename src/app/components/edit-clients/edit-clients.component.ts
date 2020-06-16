import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {
  id:string;
  client:Client;
  constructor(private clientService:ClientService,
    private route:ActivatedRoute, private flashMessage:FlashMessagesService,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getUnClient(this.id).subscribe(client=>{
       this.client=client;
       console.log( this.client);
    })
  }

  onSubmit(){
    this.client.id=this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client updated', {cssClass:'alert-success',timeout:4000})
    this.router.navigate(['/client/',this.id])
}
}
