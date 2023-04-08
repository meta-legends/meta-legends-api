<p align="center">
  <a href="http://meta-life.io.com/" target="blank"><img src="https://meta-legends.com/img/logo-avatar-title.b6d5dec7.svg" width="200" alt="Meta-Legends Logo" /></a>
</p>


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Use case
 
```bash
# MintPackage : Search GET   /mint-packages/search?wallet=[wallet-address]

# MintPackage : View   GET   /mint-packages/[mint-package-id]

# MintPackage : Update PATCH /mint-packages/[mint-package-id]
# => (Body Json: mintWallet)             

# RewardToken : View   GET   /[wallet-address]/estimate
```


## Author

- Author - [HandoSensei](https://twitter.com/handosensei)

