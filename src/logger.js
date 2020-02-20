'use strict';

const winston = require('winston');
const config = require('./config');

winston.configure({
    transports: [
      new winston.transports.Console({timestamp: true})
    ]
});

const trace = (str, metadata) => winston.trace(str, metadata);
const debug = (str, metadata) => winston.debug(str, metadata);
const info = (str, metadata) => winston.info(str, metadata);
const warn = (str, metadata) => winston.warn(str, metadata);
const error = (str, metadata) => winston.error(str, metadata);

module.exports = {
    trace,
    debug,
    info,
    warn,
    error
};
