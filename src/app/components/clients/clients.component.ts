import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  total:number=0;
  searchClient:Client[];
  constructor(private clientService:ClientService,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private authClientService: AuthClientService
    ) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth=>{
    this.clientService.getClient(auth.uid).subscribe(clients=> {
      this.searchClient=this.clients=clients;
          this.total = this.getTotal();
        })
    })
    
  }

  search(query:string){
    this.searchClient=(query)?this.clients.filter(client=>
      client.firstName.toLowerCase().includes(query.toLowerCase()) || client.lastName.toLowerCase().includes(query.toLowerCase())
      || client.email.toLowerCase().includes(query.toLowerCase()) || client.phone.toString().includes(query))
       : this.clients;
  }

  getTotal(){
   return this.clients.reduce((total, client)=>{
      return parseFloat(client.balance.toString()) + total;
    },0)
  }
  deleteClient(id:string){
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(id);
        this.flashMessage.show('client Deleted', {cssClass:'alert-danger',timeout:4000});
        this.router.navigate(['/']);
        
        swal.fire({
          text: 'Client Deleted',
          icon: 'success',
          title: 'Deleted!',
          timer: 3000
        })
      } 
    }
    )
  }}
