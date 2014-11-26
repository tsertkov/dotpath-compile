# dotpath-compile

[![Build Status](https://travis-ci.org/tsertkov/dotpath-compile.svg)](https://travis-ci.org/tsertkov/dotpath-compile)
[![David Status](https://david-dm.org/tsertkov/dotpath-compile.png)](https://david-dm.org/tsertkov/dotpath-compile)

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

## Scripts

- `npm test` - run tests
- `npm run jsdoc` - build jsdoc
- `npm run dev` - run tests continuously

## License

The MIT License (MIT)
