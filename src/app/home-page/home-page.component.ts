import {Component, OnInit} from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Observable} from 'rxjs';
import {IPost} from '../shared/components/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$: Observable<IPost[]>;
  posts: IPost[];
  authorNum: number;

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll();


    this.posts$.subscribe((posts) => {
      this.authorNum =  posts.length;
      this.posts = posts;
    });
  }

}
