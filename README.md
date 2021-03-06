## Application Functionality:

- Display all contacts
  - Phone numbers properly formatted
  - Ability to filter contacts by name
- Add new contact
- Edit contact
- Delete contact

### Contact model

- Name
- Phone Number (E.164 format)



## Django
 
### Tastypie

- The app used Django Tastypie to manage the API. It is more lightweight than Django Rest Framework and after a period of stagnation is back in active development.

- The authentication is done based on Django user credentials and the authorization is not checked. Tastypie offers more substantial options for real production enviroments, like session authentication.

- The testing is done using the standard Django unittest framework. Pytest allows a little bit more flexibilty, but isn't leaps and bounds better in my experience.

- The phone number validation is enforced by length and digits, apart from a leading '+' by a regex on the model.

## AngularJS

#### ContactView

- In the contact view, when adding, editing, or deleting a contact, it grabs the whole list of contacts over again. This is a convenience to make sure that the user is seeing a proper representation of what exists in the database. In a large application, this could have performance issues, but should be sufficient for this app.

- The styling is done with Angular Material. 

- The phone number validation is enforced by length and digits, apart from a leading '+' by validation on the inputs.

#### App

- The phone number formatting is done by a filter on the app.

### Deployment instructions 

#### Heroku

The current version of the repo is set up for deployment to Heroku.

Create a Heroku app

    heroku create

Add that app as a remote on the repository

    heroku git:remote -a [heroku-app-name]
    
Add app name to ALLOWED_HOSTS in contacts_app/settings.py

    ALLOWED_HOSTS = ['pacific-oasis-27433.herokuapp.com']

Deploy code to app

    git push heroku master

Migrate the initial Django migrations

    heroku run python manage.py migrate
    
Create user

    heroku run python manage.py createsuperuser


#### Other

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
    
    

    
### Testing Instructions

#### Django Testing
Run normal Django tests

    python manage.py test
    
#### Angular Testing  
Install npm (see https://nodejs.org/en/download/ for instructions based on system)

install karma

    npm install karma --save-dev
    
install karma plugins

    npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev

install karma CLI for ease of use

    npm install -g karma-cli
    
Run tests

    karma start
