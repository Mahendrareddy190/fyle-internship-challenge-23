import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  Repositories:any = [];
  userProfile:any = {};
  p: number = 1;
  username:string = 'johnpapa';
  skeletonloader:boolean=true;
  Tags:any = {}; 
  perPageRepo:number=10;
  constructor(
    private apiService: ApiService
  ) {}
  
  onEnter(value: string) {
    this.username = value;
    this.skeletonloader=true;
    this.APIcall()
  }

  APIcall(){
    this.apiService.getUser(`${this.username}`).subscribe(data => {
      this.userProfile = data
    }) 
    this.apiService.getRepos(`${this.username}`).subscribe(data => {
      this.Repositories = data      
    })
    setTimeout(() => {
      this.skeletonloader=false;
    },  1000);
    setTimeout(() => {
      this.getCurrentPageRepos() 
    },  1000);
   
  }
  
  getRepoTags(languages_url:string,name:string){
      this.apiService.getTopic(languages_url).subscribe(Response => {
      this.Tags[name] = Object.keys(Response)
      })
  }
  getCurrentPageRepos(){
    // var i:number=0;    
    // if(this.Tags.length!=0){this.Tags=[]}
    if(this.Repositories.length){
    for (const repo of this.Repositories) {
      // if (i<this.perPageRepo) {
        this.getRepoTags(repo.languages_url,repo.name)
        // i+=1
      // }
    }
      }
   }

  ngOnInit() {
    this.APIcall() 
  }
}
