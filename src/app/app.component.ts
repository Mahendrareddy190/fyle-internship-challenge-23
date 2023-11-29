import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  public Repositories:any = [];
  public userProfile:any = {};
  p: number = 1;
  value:string = 'johnpapa';
  skeletonloader:boolean=true;
  title:string="fyle-frontend-challenge";
  perPageRepo:number=10;
  constructor(
    private apiService: ApiService
  ) {}
  
  onEnter(value: string) {
    this.value = value;
    this.skeletonloader=true;
    this.APIcall()
  }

  APIcall(){
    this.apiService.getUser(`${this.value}`).subscribe(data => {
      this.userProfile = data
    }) 
    this.apiService.getRepos(`${this.value}`).subscribe(data => {
      this.Repositories = data      
    })
    setTimeout(() => {
      this.skeletonloader=false;
    },  1000);
  }

  ngOnInit() {
    this.APIcall()  
  }
}
