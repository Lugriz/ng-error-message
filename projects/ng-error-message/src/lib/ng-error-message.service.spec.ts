import { TestBed } from '@angular/core/testing';
import { NgErrorMessageService } from './ng-error-message.service';
import { NgErrorMessageLoaderService, NG_ERROR_MESSAGE_LOADER } from './ng-error-message.loader.service';
import { of } from 'rxjs';

describe('NgErrorMessageService', () => {
  let token;
  let loader;

  beforeEach(() => {

    loader = jasmine.createSpyObj('NgErrorMessageLoaderService', ['getDictionary']);

    loader.getDictionary.and.returnValue( of({ required: 'This is required', maxlength: 'Should be {{ max }}' }) );

    TestBed.configureTestingModule({
      providers: [
        {
          provide: NG_ERROR_MESSAGE_LOADER,
          useValue: loader
        }
      ]
    });

    token = TestBed.get(NG_ERROR_MESSAGE_LOADER);
  });

  it('should be created', () => {
    const service: NgErrorMessageService = TestBed.get(NgErrorMessageService);
    expect(service).toBeTruthy();
  });

  it('should be empty object', () => {
    const service: NgErrorMessageService = TestBed.get(NgErrorMessageService);
    expect(service.errors).toEqual({});
  });

  it('should be object with errors', () => {
    const service: NgErrorMessageService = TestBed.get(NgErrorMessageService);
    service.load();
    expect(service.errors).toEqual({ required: 'This is required', maxlength: 'Should be {{ max }}' });
  });
});
