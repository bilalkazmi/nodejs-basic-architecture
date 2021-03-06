## NodeJS Architecture Template 

A Simple NodeJS server that utilizes Socket IO, Redis and MongoDB with a clean structure 
that follows functional programming paradigm 

## Routing 
Routes are defined in routes.json and every route have a related controller. 
There is a script "npm run addRoute `pathname` `controllerName` `method`" that
appends the <b>routes.json</b> file with a new route including `pathname`, `method` and `controllerName`
You must create a controller function with the same name that is provided here and 
import and export the same function from https://github.com/bilalkazmi/nodejs-basic-architecture/blob/master/controllers/index.js<br/>
Example Controller : https://github.com/bilalkazmi/nodejs-basic-architecture/blob/master/controllers/test/test.js

## Handling Different Routes
There is a function `handleRoutes` inside https://github.com/bilalkazmi/nodejs-basic-architecture/blob/master/handle-routes.js that takes Request and Response
parameters, checks routes inside https://github.com/bilalkazmi/nodejs-basic-architecture/blob/master/routes.json and calls the appropriate controller

## Socket IO
Socket is used to implement a very basic Socket server that allows chat in a room 
with different users being subscribed
https://github.com/bilalkazmi/nodejs-basic-architecture/blob/master/socket/index.js

## Redis 
Redis is also utilized for caching requests and temporarily storing some socket related data
https://github.com/bilalkazmi/nodejs-basic-architecture/blob/master/redis/index.js

## Scripts 
There is a folder https://github.com/bilalkazmi/nodejs-basic-architecture/tree/master/scripts that includes some helper scripts to easily implement some features like new endpoints, etc.
