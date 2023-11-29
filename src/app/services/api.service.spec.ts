import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'

describe('ApiService', () => {
  let service: ApiService;
  let testingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get all Repositores with username johnpapa',()=>{
     service.getRepos("johnpapa").subscribe((repo : any) => {
         expect(repo).toBeTruthy();
     })
     const mockreq = testingController.expectOne('https://api.github.com/users/johnpapa/repos')
     expect(mockreq.request.method).toEqual('GET')
  })

  it('Get user profile of johnpapa',()=>{
    service.getUser("johnpapa").subscribe((user : any) => {
        expect(user).toBeTruthy();
    })
    const mockreq = testingController.expectOne('https://api.github.com/users/johnpapa')
   expect(mockreq.request.method).toEqual('GET')
 })


});
