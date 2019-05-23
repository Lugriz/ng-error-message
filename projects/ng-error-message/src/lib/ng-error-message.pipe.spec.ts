import { NgErrorMessagePipe } from './ng-error-message.pipe';
import { NgErrorMessageService } from './ng-error-message.service';
import { TestBed } from '@angular/core/testing';

describe('NgErrorMessagePipe', () => {
  let errSrv;
  let errors: any = {
    errors: { required: 'This is required', maxlength: 'Should be {{ max }}' , minlength: 'Should be from {{ min }} to {{max}}' }
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgErrorMessageService, useValue: errors
        }
      ]
    });

    errSrv = TestBed.get(NgErrorMessageService)
    
  });

  it('create an instance', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    expect(pipe).toBeTruthy();
  });

  it('should return null when the value does not exist', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ noexists: true });
    expect(value).toBe(null);
  });

  it('should return required message', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ required: true });
    expect(value).toBe('This is required');
  });

  it('should return maxlength message without params', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ maxlength: true });
    expect(value).toBe('Should be {{ max }}');
  });

  it('should return maxlength message with params', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ maxlength: true }, { maxlength: { max: 5 } });
    expect(value).toBe('Should be 5');
  });

  it('should ignores the extra params', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ maxlength: true }, { maxlength: { max: 5 }, m: { a: 1 } });
    expect(value).toBe('Should be 5');
  });

  it('should return minlength message with multiple params', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ minlength: true }, { minlength: { max: 5, min: 1 } });
    expect(value).toBe('Should be from 1 to 5');
  });

  it('should return null if it does not errors and has params', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform(null, { minlength: { max: 5, min: 1 } });
    expect(value).toBe(null);
  });

  it('should return null if it does not errors', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform(null);
    expect(value).toBe(null);
  });

  it('should return null if the value is an array', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform([1]);
    expect(value).toBe(null);
  });

  it('should return null if the value is a number', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform(1);
    expect(value).toBe(null);
  });

  it('should return null if the value is a string', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform('test');
    expect(value).toBe(null);
  });

  it('should return null if the value is a undefined', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform(undefined);
    expect(value).toBe(null);
  });

  it('should return null if the args are undefined', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({}, undefined);
    expect(value).toBe(null);
  });

  it('should return null if the value is an empty object', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({});
    expect(value).toBe(null);
  });

  it('should return null if the arg is an array', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ required: true }, []);
    expect(value).toBe(null);
  });

  it('should return null if the arg is a number', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ required: true }, 1);
    expect(value).toBe(null);
  });

  it('should return null if the arg is a string', () => {
    const pipe = new NgErrorMessagePipe(errSrv);
    const value = pipe.transform({ required: true }, 'test');
    expect(value).toBe(null);
  });
});
