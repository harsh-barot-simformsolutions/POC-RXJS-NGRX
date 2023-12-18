import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {customincrement} from 'src/app/shared/store/counter.actions';
import {CounterModel} from 'src/app/shared/store/counter.state';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.css']
})
export class CustomcounterComponent implements OnInit {
  counterinput!:number;
  actiontype= 'add';
  constructor(private store:Store<{counter:{counter:CounterModel}}>) { }

  ngOnInit(): void {
  }

  OnIncrement() {
  this.store.dispatch(customincrement({value:+this.counterinput,action:this.actiontype}))
  }

}
