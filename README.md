# TODO

## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#instructions-to-run)
* [Author](#author)

## About the Project 

A CRUD Todo application with Django Rest framework for the backend, React for the frontend. The application includes axios library to make http requests to Django from React.


## Getting Started

Setup project environment with virtualenv and pip.


```sh
virtualenv Todo-venv
source Todo-venv/bin/activate
pip install -r requirements.txt
```


Instructions to run.


```sh
cd todo
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 6362
```


Port number to run the app is 6362

Run the react app in another terminal


```sh
cd front
npm start
```



## Author

**Sadham Hussian M**