# dotpath-compile

[![NPM](https://nodei.co/npm/dotpath-compile.png)](https://nodei.co/npm/dotpath-compile/)

[![Build Status](https://travis-ci.org/tsertkov/dotpath-compile.svg?branch=master)](https://travis-ci.org/tsertkov/dotpath-compile)
[![Coverage Status](https://img.shields.io/coveralls/tsertkov/dotpath-compile.svg)](https://coveralls.io/r/tsertkov/dotpath-compile?branch=master)

> Dot-path based JavaScript object template compiler.

## Features

- expand dot-path template variables
- flexible inheritance mechanism

## Usage

```javascript
var compile = require('dotpath-compile');
someobj = compile(someobj);
```

All use cases are described in [test code](https://github.com/tsertkov/dotpath-compile/blob/master/test/compile.js).


## Public API

### compile(obj)

Compile dotpath template variables in a given object.

**Parameters:**

- *obj* {Object | Array} - Object to be compiled

**Return Values:**

Returns compiled object.

## Private API

Complete API Documentation including private and public methods is generated from source code by JSDoc tool and is [available here](https://s3.eu-central-1.amazonaws.com/tsertkov-artifacts/dotpath-compile/master/jsdoc/index.html).

## Code coverage

Code coverage report for all files is [available here](https://s3.eu-central-1.amazonaws.com/tsertkov-artifacts/dotpath-compile/master/coverage/lcov-report/index.html).

## Scripts

- `npm test` - run tests
- `npm run jsdoc` - build jsdoc
- `npm run dev` - run tests continuously

## License

The MIT License (MIT)
