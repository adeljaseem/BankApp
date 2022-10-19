import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  //login Acno
  acno:any
  //hold transaction
  transaction:any

  constructor(private ds:DataService) {
    //get login acno from data service
    this.acno = this.ds.currentAcno
    //get transaction array fro ds
    this.transaction = this.ds.getTransaction(this.acno)
    console.log(this.transaction);
    

   }

  ngOnInit(): void {
  }

}
