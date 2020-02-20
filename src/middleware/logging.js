'use strict';

const logger = require('../logger');

const logRequestsAndResponse = async (ctx, next) => {
    let user = ctx.state.user ? {userId: ctx.state.user.sub} : {};
    try {
        logger.info(`Request - ${ctx.request.url}`, user);
        await next();
        logger.info(`Response`, {statusCode: ctx.status});
    } catch (err) {
        logger.error(`Error`, err);
        logger.info(`Response`, {statusCode: ctx.status});
    }
};

module.exports = logRequestsAndResponse;
