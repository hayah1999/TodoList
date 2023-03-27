# Todolist_WebApplication

## Setup

install backend dependencies -> go to root directory

```
npm install
```

## Set Env variables

create .env file in root directory with the following variables and add your values

```
PORT = 
MONGO_URI =
NODE_ENV = dev
TOKEN_SECRET = for admin authentication
JWT_SECRET = for user authentication
SALTROUNDS = 
```
## To run the server and automatically restart upon changes

```
npm start

```
## How to get the routes

In the routes folder in each route file for each funnction you will find above it a comment of its route, the request method and if it needs authentication (private) or not (public)