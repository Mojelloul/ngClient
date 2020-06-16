import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-details-clients',
  templateUrl: './details-clients.component.html',
  styleUrls: ['./details-clients.component.css']
})
export class DetailsClientsComponent implements OnInit {

  id:string;
  client:Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: 0
  }
  showBalance:boolean = false;
  constructor(private clientService:ClientService,
     private route:ActivatedRoute, private flashMessage:FlashMessagesService,
     private router:Router
     ) { }

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
    this.flashMessage.show('balance updated', {cssClass:'alert-warning',timeout:4000})
  }
  deleteClient(id:string){
    if(confirm('Are you sure to delete this Client?')){
      this.clientService.deleteClient(id);
    this.flashMessage.show(this.client.firstName+' '+this.client.lastName+' Deleted', {cssClass:'alert-danger',timeout:4000})
    this.router.navigate(['/'])
    }
  }
}
