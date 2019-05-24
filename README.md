# ng-error-message

Displays error messages when a form control is invalid avoiding the long list of tags for each error.

## Reason

When developing a form, it's common to validate each input and display the errors when they exist. However, it's tediuos to write a tag for each error, something like this:

```html
<div *ngIf="form.get('email').hasError('required')">
    This field is required
</div>
<div *ngIf="form.get('email').hasError('email')">
    This field is not a email
</div>
```

The list of tags could be large depending the number of validations in the input. The purpose of this packages is to avoid doing that.

## Usage

The first thing you need to do it's to create a json file, in the file you will have all the errors you need in your application. Every property in the json will be named as the error displayed by the form (using reactive forms), for example, when a field has an error you can write **form.get('field').errors** and receive the error object, by example: 

```javascript
    // form.get('field').errors

    // The field is required and displays the error
    { 
        required: true
    }

    // The field must be an email
    { 
        email: true
    }

    // The field must be numeric and 5 as maximum length 
    { 
        required: true,
        maxlength: true
    }
```

Then, if you want to display a message for each error, our json file needs to look like this:

```javascript
    // assets/example/errors.json
    {
        "required": "This field is required",
        "email": "This field is not a email",
        "maxlength": "This field exceeds the maxium number of 5 characters"
    }
```

Then, import **NgErrorMessageModule, NgErrorMessageLoaderService, NgErrorMessageLoader** in your **AppModule** and call the forRoot method passing it a factory provider configuration.

- **NgErrorMessageModule:** The module that contains the *errorMessage* pipe and starts the *NgErrorMessageService* if the *forRoot* method is called.
- **NgErrorMessageLoaderService:** This the loader class that load the specified error json file.
- **NgErrorMessageLoader:** This is an abstract class that is provided as token to starts the loader (**NgErrorMessageLoaderService**).

```javascript
import { NgErrorMessageModule, NgErrorMessageLoaderService, NgErrorMessageLoader } from 'ng-error-message';

// Remember to export the function
export function loaderFun (http: HttpClient) {
    return new NgErrorMessageLoaderService(http, 'assets/example/errors.json');
}

@NgModule({
  imports: [
    NgErrorMessageModule.forRoot({
        provide: NgErrorMessageLoader,
        useFactory: loaderFun,
        deps: [HttpClient]
    }),
    ...
  ]
})
export class AppModule { }

// If you have a multilanguage app, you could do this:
import { NgErrorMessageModule, NgErrorMessageLoaderService, NgErrorMessageLoader } from 'ng-error-message';

// Remember to export the function
export function loaderFun (http: HttpClient) {
    return new NgErrorMessageLoaderService(http, 'assets/example/' + navigator.language + '.json');
}

@NgModule({
  imports: [
    NgErrorMessageModule.forRoot({
        provide: NgErrorMessageLoader,
        useFactory: loaderFun,
        deps: [HttpClient]
    }),
    ...
  ]
})
export class AppModule { }

// You should have multiple json files with the specific language
```

If you want to create a custom *NgErrorMessageLoaderService* you need to implement the *NgErrorMessageLoader* class to your custom class, for example:

```javascript
    // your custom class
    import { NgErrorMessageLoader } from 'ng-error-message';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';

    export class MyLoader implements NgErrorMessageLoader {

        constructor(
            private http: HttpClient,
            private jsonUrl: string
        ) {}

        public getDictionary(): Observable<any> {
            // your code

            /**
             * example:
             * 
             * return this.http.get(this.jsonUrl)
             * */

            return // return the json file or a custom object {}
        }

    }

    // ==========================================================

    // your AppModule
    import { NgErrorMessageModule, NgErrorMessageLoader } from 'ng-error-message';
    import { MyLoader } from 'the/path/MyLoader';

    // Remember to export the function
    export function loaderFun (http: HttpClient) {
        return new MyLoader(http, 'assets/example/errors.json');
    }

    @NgModule({
        imports: [
            NgErrorMessageModule.forRoot({
                provide: NgErrorMessageLoader,
                useFactory: loaderFun,
                deps: [HttpClient]
            }),
            ...
        ]
    })
    export class AppModule { }
```

**NOTE:** The forRoot method just will be called in the main Module, commonly *AppModule*. By using the Pipe just import the *NgErrorMessageModule* without the *forRoot* method.

once the **NgErrorMessageModule** is imported, you have to start the service to load the errors dictionary. Import the **NgErrorMessageService** in your AppComponent (or your boot component) and start it.

```javascript
    import { NgErrorMessageService } from 'ng-error-message';

    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
        constructor(
            private errMessageService: NgErrorMessageService
        ) {
            // It will call the json file
            this.errMessageService.load();
        }
    }
```

Now the service is started, you can use the **errorMessage** pipe in your HTML, you just need both one tag and to check if the input is invalid and all messages will be displayed in.

```html
    <div *ngIf="form.get('control').invalid">
        {{ form.get('control').errors | errorMessage  }}
    </div>
```

The pipe will display the first error found of the form control to avoid shows multiple messages, so the user modify one error at a time.

You can pass params to the pipe, this is useful for dynamic messages.

The json file:

```javascript
    {
        "maxlength": "This field exceeds the maxium number of {{ max }} characters"
    }
```

The html:

```html
    <div *ngIf="form.get('control').invalid">
        {{ form.get('control').errors | errorMessage : { maxlength: { max: '5' } }  }}
    </div>
```

You need to pass an object to the pipe specifying the error and its params. Another example with multiple validations in one input.

The json file:

```javascript
    {
        "maxlength": "The number of characteres must be from {{ min }} to {{ max }}",
        "required": "The field {{ name }} is required"  
    }
```

The html:

```html
    <div *ngIf="form.get('control').invalid">
        {{ form.get('control').errors | errorMessage : { maxlength: { max: '5', min: '1' }, required: { name: 'Firstname' } }  }}
    </div>
```

## Contribution

### Test the package

Download the package and run:

> $ npm run test:lib

### Build the package

If you modified the package and you want to build it run:

> $ npm run build:lib