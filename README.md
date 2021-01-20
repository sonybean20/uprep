# UPREP

## Go to app

Follow the [link](https://sonybean20.github.io/uprep/index.html) to view the app. (Under maintenance)

## Setting up

### Running backend
`cd backend`

Install Pipenv using `pip3` and activate a new virtual environment:

`pip3 install pipenv`

`pipenv shell`


Install Django using Pipenv:

`pipenv install django`

Run migrations:

`python manage.py migrate`

`python manage.py makemigrations uprep`

`python manage.py migrate uprep`

Create a superuser account for admin access:

`python manage.py createsuperuser --username=joe --email=joe@example.com`

Run backend on http://localhost:8000 and manage on http://localhost:8000/admin :

`python manage.py runserver`

### Running frontend
`cd frontend`

Install yarn if not already installed:

`brew install yarn`

Install dependencies:

`yarn install`

Run frontend on http://localhost:3000 :

`yarn start`
