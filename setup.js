// run this script after you have replaced the 'PLACEHOLDER' values in .sample-env
// it will copy them over to .env, which the program will grab these values from

'use strict'
var fs = require('fs')
fs.createReadStream('.sample-env')
  .pipe(fs.createWriteStream('.env'))