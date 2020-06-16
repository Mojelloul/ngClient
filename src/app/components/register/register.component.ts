import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string;
  password:string;
  constructor(private authClient: AuthClientService,private router:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }
  onRegister(){
    this.authClient.Register(this.email,this.password).then(register=>{
      if(register){
        this.flashMessage.show('You are Logged',{cssClass:'alert-success',timeout:5000});
        this.router.navigate(['/']);
      }
    }).catch(error =>{
      this.flashMessage.show(error.message
      ,{cssClass:'alert-danger',timeout:7000});

    })
  }
}
