import { Component, OnInit } from '@angular/core';
import { BlogModel, Blogs } from '../../shared/store/blog/Blog.model';
import {Store} from '@ngrx/store';
import { getblog, getbloginfo } from '../../shared/store/blog/Blog.selectors';
import { AppStateModel } from '../../shared/store/Global/AppState.Model';
import {MatDialog} from '@angular/material/dialog';
import {AddblogComponent} from '../addblog/addblog.component';
import {Subject, identity} from 'rxjs';
import {title} from 'process';
import {deleteblog, loadblog, searchblog} from 'src/app/shared/store/blog/Blog.actions';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private searchSubject = new Subject<string>();
  constructor(private store:Store<AppStateModel>, private dialog:MatDialog) { }
  bloglist!: BlogModel[];
  bloginfo!:Blogs;
  ngOnInit(): void {
    this.store.dispatch(loadblog())
    this.store.select(getbloginfo).subscribe(item=>{
      // this.bloglist = item;
      this.bloginfo = item;
    })
    this.searchSubject
    .pipe(
      debounceTime(10),
      distinctUntilChanged(),
    )
    .subscribe((searchText) => {
      if (searchText.length > 0) {
        this.store.dispatch(searchblog({ searchText }));
      } else {
        this.store.dispatch(loadblog());
        this.store.select(getbloginfo).subscribe((item) => {
          this.bloginfo = item;
        });
      }
    });
  }

  AddBlog() {
  this.openPopup(0,'Add Blog')
  }


  openPopup(id:any,title:any,isedit=false) {
    this.dialog.open(AddblogComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isedit:isedit
      }
    })
  }

  EditBlog(id:any) {
    this.openPopup(id,'Edit Blog',true);
  }

  removeBlog(id:any) {
    if(confirm("Are sure you want to delete this")){
      this.store.dispatch(deleteblog({id:id}));
    }
  }

  handleSearch(event:any) {
    this.searchSubject.next(event.target.value);
  }
}
