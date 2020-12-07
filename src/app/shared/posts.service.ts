import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFirebaseCreateResponse, IPost} from './components/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  create(post: IPost): Observable<IPost> {
    return this.http.post(`${environment.firebaseDbUrl}/posts.json`, post)
      .pipe(map((response: IFirebaseCreateResponse) => {
        const newPost: IPost = {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };

        return newPost;
      }));
  }

  getAll() {
    return this.http.get(`${environment.firebaseDbUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
      }));
  }

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.firebaseDbUrl}/posts/${id}.json`)
      .pipe(map((post: IPost) => {
        return {
          ...post, id,
          date: new Date(post.date)
        };
      }));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseDbUrl}/posts/${id}.json`);
  }

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.firebaseDbUrl}/posts/${post.id}.json`, post);
  }


}
