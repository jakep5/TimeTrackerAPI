# TimeTracker API

API implementation for use with the Time Tracker application. Gives users the ability to create accounts, authenticate/login, and add tasks to their respective lists. This API coordinates with the TimeTracker front-end application in order to give users the ability to have a personal task list, along with their own profile containing information regarding their added tasks. 

## Link to Live Application

https://time-tracker-jakepagel1.now.sh/

## API Technologies

Node.js, Express.js and Express Router, JavaScript, PostgreSQL, Knex.js


## Authentication

Authentication was implemented using JWT authentication in conjunction with a PostgreSQL database. Users log in with their selected username and password, and they are returned a user_id, which is stored in local storage. Then, any added tasks will be associated with their respective user_id. 

## GET - Tasks

### Base URL + '/tasks'

Returns an array of objects of tasks associated with the user's userId number. The userId is passed as a request header. The response is an array of objects of tasks in JSON format.

## POST - Task

### Base URL + '/tasks'

Posts a task to the database with information passed in the request body. The user's userId is added to the task before the request is sent. The task body format is as follows:

```json
{
  "name": "Learn JavaScript",
  "hours": 30,
  "priority": "high",
  "user_id": 1
}
```
