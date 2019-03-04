# Node/Express using typescript

### Boilerplate for using typescript in node. 

## Features
* Uses typescript
* Basic mysql/sequlize model setup
* Global error handling
* Request input validation using [Joi](https://github.com/hapijs/joi)
_ _ _ _

## Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run watch

```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run watch
```


#### Run in *production* mode:

Compiles the application and starts it in production mode.

```shell
npm run compile
npm start
```


## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/` endpoint 
  ```shell
  curl http://localhost:3000/
  ```


#### Debug with VSCode

Add these [contents](https://github.com/thecodearcher/node-typescript/blob/master/.vscode/launch.json) to your `.vscode/launch.json` file
