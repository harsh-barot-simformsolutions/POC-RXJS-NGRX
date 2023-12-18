import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {decrement, increment, reset} from 'src/app/shared/store/counter.actions';
import {CounterModel} from 'src/app/shared/store/counter.state';

@Component({
  selector: 'app-counterbutton',
  templateUrl: './counterbutton.component.html',
  styleUrls: ['./counterbutton.component.css']
})
export class CounterbuttonComponent implements OnInit {

  constructor(private store:Store<{counter:{counter:CounterModel}}>) { }

  ngOnInit(): void {
  }

  OnIncrement() {
    this.store.dispatch(increment());
  } 

  OnDecrement() {
    this.store.dispatch(decrement());

  }

  OnReset() {
    this.store.dispatch(reset());

  }
}
