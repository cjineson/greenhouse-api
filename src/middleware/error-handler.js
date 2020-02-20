'use strict';

const logger = require('../logger');

const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.res.statusCode = 500;
        logger.error('An error occurred executing an HTTP request; a 500 response was sent to the client', e);
    }
};

module.exports = errorHandler;
