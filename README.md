# NodeJS Project Structure

## Getting started

### Install Node
```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
$ nvm install 10.5.0
$ nvm use 10.5.0
```

### Clone this repo (and `cd` to it)
```sh
$ git clone https://github.com/kapilbarad/nodejs-project-structure.git
$ cd nodejs-project-structure
```

### Install Dependencies
```sh
$ npm install
```

### Load env vars
```sh
cp .env-example .env
```
Input the desired environment variables in `.env`.

### Start the server
```sh
$ npm run start
```