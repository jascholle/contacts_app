# Interview Exercise - Full Stack Developer

## Application Functionality:

The goal of this exercise is to create a simple contacts app that interacts with a REST API and displays data in a usable fashion.

- Display all contacts
  - Phone numbers should be properly formatted
  - Ability to filter contacts by name
- Add new contact
- Delete contact

### Contact model

- Name
- Phone Number (E.164 format)

E.164 format enforced by regex on contact model


### Extra Functionality (Not Required):

- Edit contact
- Add image to contact model


## Django Tastypie

The app used Django Tastypie to manage the API. It is more lightweight than Django Rest Framework and after a period of stagnation is back in active development.
The authentication is done based on Django user credentials and the authorization is not checked. Tastypie offers more substantial options for real production enviroments, like session authentication.

## AngularJS

#### ContactView

In the contact view, when we add, edit, or delete a contact, we grab the whole list of contacts over again. This is a convenience to make sure that the user is seeing a proper representation of what exisits in the database. In a large application, this could have performance issues, but should be sufficient for this app.





## Implementation Requirements

- The backend has to be developed with Django + Django REST Framework (API errors should be handled appropriately).
- The frontend has to be developed with Angular and must communicate with the backend through the REST API.
- Use (or don’t use) any CSS framework you wish to create a pleasing UI.

## Notes

* Please provide a README with any instructions on how to run or compile your code.
* While the main goal is evaluating the code quality, your code will be run and tested.



### Deployment instructions

Install python packages

    pip install -r requirements.txt
    
Run initial migrations to create Django database models

    python manage.py migrate
    
Create Contact app migrations (May also be done before previous step)

    python manage.py makemigrations
    python manage.py migrate
    
Create super user 
(https://docs.djangoproject.com/en/1.11/intro/tutorial02/#creating-an-admin-user)

    python manage.py createsuperuser
    
Install npm

install karma

    npm install karma --save-dev
    
instal karma plugins

    npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
