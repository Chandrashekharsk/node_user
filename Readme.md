# Title
Node Project - Welcome in my first self made node project 

# Description
I have made a node project in which i have made a API for doing CRUD operations. In which i have also used validation and hashing password technologies to enhance security of application. This is my first self made project so if you have any feedback then don't hesitate to contact me, i will be Happy for this action and i'll definately  improve that.

## Features 
This api is capable for register and login user. This is also capable in forget password and delete user. For security of application  server used hashing technique to hash a password. To enhance the security of application i also used Authentication token for varify user in deffenrents routes. I have used MongoDB as a DBMS to store data.

## Technologies Used 
Node.js, Express.js, Mongoose, jsonwebtoken, bcryptjs, MogoDB,dotenv

## Installation - run these command in terminal
$ git init  
$ git clone https://github.com/Chandrashekharsk/node_user.git  
$ cd ecommerce_project  
$ npm i  

## Environment variables
to setup environment variables just write this command in the terminal  
$ npm i dotenv  
after this command create .env file in root directory and make these variables  

PORT = #   
URI = #  
JWT_KEY = #  

finally, you need to replace these "#" with your own value.

## Usage
npm run start - for run by nodemon  
npm run dev - for run by node  


## API-Endpoints  
POST /api/users/register:  register new user  
POST /api/users/login:  login user  
GET /api/users/currentuser:  check current user  
PATCH /api/users/forgetpassword:   change password  
DELETE /api/users/deleteuser:  delete user  


