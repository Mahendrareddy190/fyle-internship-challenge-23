import { TestBed,ComponentFixture,tick,fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ApiService } from './services/api.service'; 
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let apiService: ApiService;

  beforeEach(
    async () => {
      await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule,NgxPaginationModule,NgxSkeletonLoaderModule,FormsModule],
        declarations: [AppComponent],
        providers: [ApiService],
      }).compileComponents();
  
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      apiService = TestBed.inject(ApiService); 
      fixture.detectChanges()
    });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call onEnter method to search for a GitHub profile', () => {
    const profileName = 'johnpapa';
    spyOn(component, 'onEnter').and.callThrough();  
    component.onEnter(profileName);
    expect(component.onEnter).toHaveBeenCalledWith(profileName);  
  });

  it('should call API methods and set properties correctly', fakeAsync(() => {
    const fakeUserData = {};
    const fakeRepoData = {};
    const userName = 'johnpapa';

    spyOn(apiService, 'getUser').and.returnValue(of(fakeUserData));  
    spyOn(apiService, 'getRepos').and.returnValue(of(fakeRepoData));  
    
    component.value = userName;
    component.APIcall();

    expect(apiService.getUser).toHaveBeenCalledWith(userName);
    expect(apiService.getRepos).toHaveBeenCalledWith(userName);

    tick();  

    expect(component.userProfile).toEqual(fakeUserData);
    expect(component.Repositories).toEqual(fakeRepoData);

    tick(1000);
    expect(component.skeletonloader).toBe(false);
  }));

 it('chaecking typeof Repositories,userProfile and skeletonloader',() => {
  expect(typeof component.Repositories).toBe('object') 
  expect(typeof component.userProfile).toBe('object')
  expect(typeof component.skeletonloader).toBe('boolean')
 })

 it('ngoninit',() => {
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();  
    component.ngOnInit()
    expect(component.ngOnInit).toHaveBeenCalled();
 
 })
});
