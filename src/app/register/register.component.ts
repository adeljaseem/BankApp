import { visitAll } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //properties or variables
  uname=""
  acno=""
  pswd=""

  //register - model
  registerForm = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-z]*')]],
    acno:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z0-9]*')]]
  })


  constructor(private ds:DataService,private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){

    var uname=this.registerForm.value.uname
    var acno=this.registerForm.value.acno
    var pswd=this.registerForm.value.pswd

    if(this.registerForm.valid){
      //call register in data service
      const result = this.ds.register(acno,pswd,uname)
      if(result){
        alert("Successfully Registered")
        this.router.navigateByUrl("")
      }
      else{
        alert('User alredy exist...Please Log In')
        this.router.navigateByUrl("")
      }
    }
    else{
      alert('Invalid Form!!')
    }

    
   
  }

}
