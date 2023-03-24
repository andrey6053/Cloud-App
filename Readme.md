# Cloud
## _The Last Markdown Editor, Ever_
Stack for app: 
Frontend: 
- React
- Redux
- Webpack
- SCSS

Backend: 
- Express
- node.js
- PostgreSql

## Features
- Аuthentication(JWT token)
- Upload and Download files
- Create directories
- Drag and drop files into Cloud-disk
- Search files, file sorting

## Installation
Cloud requires [Node.js](https://nodejs.org/) and PostrgreSql
First of all you should change default.json (./server/config/default.json) on your params <ServerPort,secretkey>
Second change at the sqlServices.js (./server/services/sqlServices.js) <host,port,user,password,database> for connect server with Express
```sh
git clone https://github.com/andrey6053/Cloud.git
```
Install the dependencies and devDependencies and start the server.
```sh
cd server
npm i
npm start
```
Install the dependencies and devDependencies and start the client.
```sh
cd client
npm i
npm start
```
