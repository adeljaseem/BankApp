import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //login username
  currentUsername:any

  //login acno
  currentAcno:any

  //database
  userDetails:any = {
    1000: { acno: 1000, username: 'Adel', password: 1000, balance: 5000, transaction:[] },
    1001: { acno: 1001, username: 'Arjun', password: 1001, balance: 6000, transaction:[] },
    1002: { acno: 1002, username: 'Max', password: 1002, balance: 4000, transaction:[] },
  }

  constructor() {
    this.getDetails()
   }

  //to store in local storage
  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('userDetails',JSON.stringify(this.userDetails))
    }
    //login acno
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
    //login username
    if(this.currentUsername){
      localStorage.setItem('currentUsername',JSON.stringify(this.currentUsername))
    }
  }

  //to get data from local storage
  getDetails(){
    //database
    if(localStorage.getItem('userDetails')){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '')
    }
    //login acno
    if(localStorage.getItem('currentAcno')){
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')
    }
    //login username
    if(localStorage.getItem('currentUsername')){
      this.currentUsername = JSON.parse(localStorage.getItem('currentUsername') || '')
    }
  }

  //register
  register(acno:any,password:any,username:any){
    let userDetails = this.userDetails

    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno]={
        acno,
        username,
        password,
        balance:0,
        transaction:[]
      }
      console.log(userDetails);
      this.saveDetails()
      return true
    }
  }

    //login()
    login(acno:any,pswd:any) {
      let userDetails = this.userDetails
      if (acno in userDetails) {
        if (pswd == userDetails[acno]['password']) {
          this.currentUsername = userDetails[acno]['username']
          this.currentAcno = acno
          this.saveDetails()
          return true
        }
        else {
          alert('Incorrect password')
          return false
        }
      }
      else {
        alert('User does not exist')
        return false
      }
    }
    //deposit
    deposit(acno:any,pswd:any,amt:any){
      let userDetails = this.userDetails
      var amount = parseInt(amt)
      if(acno in userDetails){
        if(pswd == userDetails[acno]['password']){
          userDetails[acno]['balance']+=amount
          userDetails[acno]['transaction'].push({
            type:'CREDIT',
            amount:amount
          })
          console.log(userDetails);
          this.saveDetails()
          return userDetails[acno]['balance']
        }
        else{
          alert('Incorrect Password!')
          return false
        }
      }
      else{
        alert('User does not exist!')
        return false
      }
    }

     //withdraw
     withdraw(acno:any,pswd:any,amt:any){
      let userDetails = this.userDetails
      var amount = parseInt(amt)
      if(acno in userDetails){
        if(pswd == userDetails[acno]['password']){
          if(userDetails[acno]['balance']>amount){
            userDetails[acno]['balance']-=amount
            userDetails[acno]['transaction'].push({
              type:'DEBIT',
              amount:amount
            })
            console.log(userDetails);
            this.saveDetails()
            return userDetails[acno]['balance']
          }
          else{
            alert('Insufficient Balance')
            return false
          } 
        }
        else{
          alert('Incorrect Password!')
          return false
        }
      }
      else{
        alert('User does not exist!')
        return false
      }
    }

    //transaction
    getTransaction(acno:any){
      return this.userDetails[acno]['transaction']
    }
}
