#!/usr/bin/env node
'use strict';


const {wscli} = require('.');


const end = error => {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
};
process.on('uncaughtException', end);
process.on('unhandledRejection', end);

const log = (...args) => console.log(...args);

const [host, maybeCount, ...msgs] = process.argv.slice(2);
const isCount = `${parseInt(maybeCount, 10)}` === `${maybeCount}`;
const count = isCount ? parseInt(maybeCount, 10) : 1;
const msg = (isCount ? msgs : [maybeCount, ...msgs]).join(' ');

wscli({host, count, msg, log, end});
