import { Injectable } from "@angular/core";
import { MasterService } from '../../master.service';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { LOAD_BLOG, addblog, loadblogfail, loadblogsuccess, addblogsuccess, updateblog, updateblogsuccess, deleteblog, deleteblogsuccess } from './Blog.actions';
import {  catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import {EMPTY, of} from "rxjs";
import {_REDUCER_FACTORY} from "@ngrx/store/src/tokens";
import { BlogModel } from './Blog.model';
import {MatSnackBar} from "@angular/material/snack-bar";
import {EMPTY_ACTION, EmptyAction, showAlert} from "../Global/App.Action";

@Injectable()
export class BlogEffects {

  constructor(private  action$:Actions, private service:MasterService, private _snackbar:MatSnackBar){
  }

  _blog =createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_BLOG),
      exhaustMap((action)=>{
        return this.service.GetAllBlogs().pipe(
          map((data)=>{
            return loadblogsuccess({bloglist:data});
          }),
          catchError((_error)=>of(
            loadblogfail({Errortext:_error.message})
          ) )
        )
      })
    )
  );


  _AddBlog = createEffect(()=>
   this.action$.pipe(
     ofType(addblog),
     exhaustMap(action=>{
       return this.service.CreateBlog(action.bloginput).pipe(
         map((data)=>{
           return addblogsuccess({bloginput:data as BlogModel})
         }),
         catchError((_error)=>of(
          loadblogfail({Errortext:_error.message})
        ) )
       )
     })
   )
  )

  _UpdateBlog = createEffect(() =>
  this.action$.pipe(
      ofType(updateblog),
      switchMap(action =>
          this.service.UpdateBlog(action.bloginput).pipe(
              switchMap(res => of(
                  updateblogsuccess({ bloginput: action.bloginput }),
                  showAlert({ message: 'Updated successfully.'})
              )),
              catchError((_error)=>of(
                loadblogfail({Errortext:_error})
              ) )
          )
      )
  )
);

  _DeleteBlog = createEffect(()=>
   this.action$.pipe(
     ofType(deleteblog),
     exhaustMap(action=>{
       return this.service.DeleteBlog(action.id).pipe(
         map(()=>{
           return deleteblogsuccess({id:action.id})
         }),
         catchError((_error)=>of(
          loadblogfail({Errortext:_error})
        ) )
       )
     })
   )
  )

  ShowsnackbarAlert(message:string) {
    return this._snackbar.open(message,'OK',{
      verticalPosition:'top',
      horizontalPosition:'end'
    })
  }
 
  _ShowAlert=createEffect(()=>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap(action=>{
      return this.ShowsnackbarAlert(action.message).afterDismissed().pipe(
        map(()=>{
          return EmptyAction();
        })
      )
      })
    )
  )
}
