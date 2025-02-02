import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`
    );
  }

  getRepos(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}/repos`
    );
  }
  getTopic(languages_url: string) {
    return this.httpClient.get(languages_url);
  }
  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}
