import { BlogComponent } from "src/app/component/blog/blog.component";
import { CounterModel } from '../counter.state';

export interface AppStateModel{
  counter:CounterModel,
  blog:BlogComponent
}