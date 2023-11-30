import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxPaginationModule,
        NgxSkeletonLoaderModule,
        FormsModule,
      ],
      declarations: [AppComponent],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call onEnter method to search for a GitHub profile', () => {
    const username = 'johnpapa';
    component.prev_username = 'john';
    component.username = username;

    spyOn(component, 'APIcall');
    spyOn(window, 'alert');

    component.onEnter();

    expect(component.prev_username).toEqual(username);
    expect(component.skeletonloader).toBe(true);
    expect(component.APIcall).toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();

    component.prev_username = username;
    component.skeletonloader = false;

    component.onEnter();

    expect(window.alert).toHaveBeenCalledWith('Change github profile name');
    expect(component.prev_username).toEqual(username);
  });

  it('should call API methods and set properties correctly', fakeAsync(() => {
    const fakeUserData = {};
    const fakeRepoData = {};
    const userName = 'johnpapa';

    spyOn(apiService, 'getUser').and.returnValue(of(fakeUserData));
    spyOn(apiService, 'getRepos').and.returnValue(of(fakeRepoData));

    component.username = userName;
    component.APIcall();

    expect(apiService.getUser).toHaveBeenCalledWith(userName);
    expect(apiService.getRepos).toHaveBeenCalledWith(userName);

    tick();

    expect(component.userProfile).toEqual(fakeUserData);
    expect(component.Repositories).toEqual(fakeRepoData);

    tick(1000);
    expect(component.skeletonloader).toBe(false);
  }));

  it('should fetch tags for a repository', () => {
    const languagesMock = { language1: 'JavaScript', language2: 'TypeScript' };
    const repoName = 'angular-quickstart-lib';
    const languagesUrl =
      'https://api.github.com/repos/johnpapa/angular-quickstart-lib/languages';

    spyOn(apiService, 'getTopic').and.returnValue(of(languagesMock));

    component.getRepoTags(languagesUrl, repoName);

    expect(apiService.getTopic).toHaveBeenCalledWith(languagesUrl);
    expect(component.Tags[repoName]).toEqual(Object.keys(languagesMock));
  });

  it('should fetch tags for each repository', () => {
    const reposMock = [
      {
        name: 'angular-tour-of-heroes',
        languages_url:
          'https://api.github.com/repos/johnpapa/angular-tour-of-heroes/languages',
      },
      {
        name: 'angular-quickstart-lib',
        languages_url:
          'https://api.github.com/repos/johnpapa/angular-quickstart-lib/languages',
      },
    ];

    spyOn(component, 'getRepoTags').and.callThrough();

    component.Repositories = reposMock;

    component.getCurrentPageRepos();

    expect(component.getRepoTags).toHaveBeenCalledTimes(reposMock.length);

    for (const repo of reposMock) {
      expect(component.getRepoTags).toHaveBeenCalledWith(
        repo.languages_url,
        repo.name
      );
    }
  });

  it('chaecking typeof Repositories,userProfile and skeletonloader', () => {
    expect(typeof component.Repositories).toBe('object');
    expect(typeof component.userProfile).toBe('object');
    expect(typeof component.skeletonloader).toBe('boolean');
  });

  it('ngoninit', () => {
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
