import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPost} from '../../shared/components/interfaces';
import {Subscription} from 'rxjs';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  pSub: Subscription; // take care of memory leak
  dSub: Subscription; // delete subscription
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string): void {
    this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.warning('Post was deleted!');
    });

  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

}
