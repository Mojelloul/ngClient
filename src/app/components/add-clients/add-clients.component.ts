import { Client } from 'src/app/models/client';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {
  client:Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: 0,
    user:''
  }
  constructor(private clientService:ClientService, 
    private route:Router, 
    private flashMessages:FlashMessagesService,
    private authClientService:AuthClientService
    ) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth=>{
     this.client.user= auth.uid;
    })
  }
  onSubmit(){
    this.clientService.newClient(this.client);
    this.flashMessages.show('Client added Successfully',{cssClass:'alert alert-success',timeout:5000});
    return this.route.navigate([('/')]);
  }
}
