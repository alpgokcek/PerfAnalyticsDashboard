![React.js](https://img.shields.io/badge/React.js-16.4-72147e?style=flat-square&logo=react&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-3.3.2-f21170?style=flat-square&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-14.4-fa9905?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-7.6-ff5200?style=flat-square&logo=npm&logoColor=white)
![yarn](https://img.shields.io/badge/yarn-1.22.4-72147e?style=flat-square&logo=yarn&logoColor=white)

# PerfAnalytics-Dashboard

PerfAnalytics.Dashboard is a dashboard which shows perf related metrics in a visualized way. Application is deployed to Heroku and could be found on [dashboard-perf-analytics.herokuapp.com](https://dashboard-perf-analytics.herokuapp.com).

## Table of Contents:

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [With Webpack](#with-webpack)
  - [With Docker](#with-docker)
- [Building the Project](#building-the-project)
- [Running the Tests](#running-the-test)
- [Contact Information](#contact-information)
- [License](#license)

<br/>

## Getting Started

<hr/>

### Requirements:

<hr/>

- Node v12 or higher (with npm) -> [Node.js Downloads Page](https://nodejs.org/en/download)
- Yarn Package Manager -> Install yarn with npm: `npm install -g yarn`
- Docker v3.3.2 or higher (optional) -> [Docker Get Started Page](https://www.docker.com/get-started)
  <br/>
  <br/>
  Before starting the application, fork/download/clone this repo. There are two different ways to run the application:

### With Webpack

<hr/>

- Install the required dependencies:

```
yarn install
```

- To run the application in dev mode on [localhost:3000](http://localhost:3000):

```
yarn start
```

- To run the application with the production build on [localhost:3000](http://localhost:3000):

```
yarn build  # producing a production build
yarn run server  # running the server
```

<br/>

### With Docker

<hr/>

- Build the docker image with the following code:

```
./docker-build.sh  # for mac users
./docker-build.bat  # for windows users
```

- To run the application on [localhost:8081](http://localhost:8081):

```
docker-compose up -d --build
```

- To stop the application:

```
docker-compose stop
```

<br/>

## Building the Project

<hr/>

- To create an optimized production build:

```
npm run build
```

or

```
yarn build
```

<br/>

## Running the Tests

<hr/>

- To run the unit and snapshots tests:

```
npm test
```

or

```
yarn test
```

<br/>

## Contact Information

<hr/>

#### Author: Alp Gökçek

#### Github: alpgokcek

#### Email: alp.gokcek1@gmail.com

#### Date: May, 2021

<br/>

## License

<hr/>

[MIT](https://choosealicense.com/licenses/mit/)
