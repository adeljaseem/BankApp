import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  //login username
  user=""
  //deposit
    depositForm = this.fb.group({
    acno:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })
  //withdraw
  withdrawForm = this.fb.group({
    acno:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })

  //to display current date
  lDate:any

  constructor(private ds:DataService, private fb:FormBuilder, private router:Router) {
    this.user = this.ds.currentUsername
    this.lDate = new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('You have logged out. Please log in again.')
      this.router.navigateByUrl('')


    }
  }

  //functions
  deposit(){
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if(this.depositForm.valid){
      const result = this.ds.deposit(acno,pswd,amount)
      if(result){
        alert(`Rs.${amount} credited successfully. Total balance = Rs.${result}`)
      }
    }
    else{
      alert('Invalid Form')
    }
   
  }
  withdraw(){
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount
    if(this.withdrawForm.valid){
      const result = this.ds.withdraw(acno,pswd,amount)
      if(result){
        alert(`Rs.${amount} debited successfully. Remaining balance = Rs.${result}`)
      }
    }
    else{
      alert('Invalid Form')
    }
   
  }

  //logout
  logout(){
    localStorage.removeItem('currentUsername')
    localStorage.removeItem('currentAcno')
    this.router.navigateByUrl('')
  }

}
