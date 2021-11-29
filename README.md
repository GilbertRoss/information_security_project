## Introduction
This project was developed on our third-year of university. It cosisted of a forum where the user could sign-up and sign-in and create and answer threads  We had the task to develop a forum that had the following requirements:
 - A login system 
 - A database
 - Have an XSS attack protection
 - Have a SQL injection protection 
 - A fully functioning frontend and backend

### Technologies

The frontend was developed using React (https://it.reactjs.org/) and chakra-ui (https://chakra-ui.com/). 
The backend was developed using FastApi (https://fastapi.tiangolo.com/) a Python framework. 
The database is created using PostgreSQL (https://www.postgresql.org/)
The passwords in the database are encrypted using the bcrypt algorithm ( https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) 


## Instructions to run the app

To run the application, you need have installed DOCKER on your machine (https://www.docker.com/). 

Steps:
1. install docker compose by running on terminal "pip3 install docker-compose". 
2. cd to the version of the app you would like to run. (vulnerable or secure app)
3. run on your terminal the command " docker-compose up "
4. visit localhost:3000 on your browser  
