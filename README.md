# ng-error-message

Displays error messages when a form control is invalid avoiding the long list of tags for each error.

## Reason

When developing a form, it's common to validate each input and display the errors when there are. However, it's tediuos write a tag for each error, something like this:

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

Then, if you want to display a message for each error, our json file need to look like this:

```javascript
    // assets/example/errors.json
    {
        "required": "This field is required",
        "email": "This field is not a email",
        "maxlength": "This field exceeds the maxium number of 5 characters"
    }
```

Then, import the **NgErrorMessageModule** in your **AppModule** and call the forRoot method passing it the path of the errors json file.

```javascript
@NgModule({
  imports: [
    NgErrorMessageModule.forRoot('assets/example/errors.json'),
    ...
  ]
})
export class AppModule { }

// If you have multilanguage app, yo could do this:

@NgModule({
  imports: [
    NgErrorMessageModule.forRoot(`assets/example/${ navigator.language }.json`),
    ...
  ]
})
export class AppModule { }

// You should have multiple json files with the specific language
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

You can pass params to the pipe, this is useful to dynamic messages.

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

You need to pass an object to the pipe specifing the error and its params. Another example with multiple validations in one input.

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