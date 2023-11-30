import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Repositories: any = [];
  userProfile: any = {};
  p: number = 1;
  username: string = 'johnpapa';
  prev_username: string = this.username;
  skeletonloader: boolean = true;
  Tags: any = {};
  perPageRepo: number = 10;
  constructor(private apiService: ApiService) {}

  onEnter() {
    if (this.prev_username != this.username) {
      this.prev_username = this.username;
      this.skeletonloader = true;
      this.APIcall();
    } else {
      alert('Change github profile name');
    }
  }

  APIcall() {
    this.apiService.getUser(`${this.username}`).subscribe((data) => {
      this.userProfile = data;
    });
    this.apiService.getRepos(`${this.username}`).subscribe((data) => {
      this.Repositories = data;
    });
    setTimeout(() => {
      this.skeletonloader = false;
    }, 1000);
    setTimeout(() => {
      this.getCurrentPageRepos();
    }, 1000);
  }

  getRepoTags(languages_url: string, name: string) {
    this.apiService.getTopic(languages_url).subscribe((Response) => {
      this.Tags[name] = Object.keys(Response);
    });
  }

  getCurrentPageRepos() {
    if (this.Repositories.length) {
      for (const repo of this.Repositories) {
        this.getRepoTags(repo.languages_url, repo.name);
      }
    }
  }

  ngOnInit() {
    this.APIcall();
  }
}
