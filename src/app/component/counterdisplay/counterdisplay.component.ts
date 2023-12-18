import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getcounter} from 'src/app/shared/store/counter.selector';
import {CounterModel} from 'src/app/shared/store/counter.state';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrls: ['./counterdisplay.component.css']
})
export class CounterdisplayComponent implements OnInit {

  counterdisplay!:number;

  constructor(private store:Store<{counter:{counter:CounterModel}}>) { }


  ngOnInit(): void {
    this.store.select(getcounter).subscribe(data=>{
       this.counterdisplay = data;
    })
  }

}
