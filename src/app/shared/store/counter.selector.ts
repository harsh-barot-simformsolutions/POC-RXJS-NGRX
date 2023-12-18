import {createFeatureSelector, createSelector} from "@ngrx/store"
import { CounterModel } from 'src/app/shared/store/counter.state';

const getcounterstate = createFeatureSelector<CounterModel>('counter');
export const getcounter = createSelector(getcounterstate,(state)=>{
  return state.counter;
})
