'use strict';
const config = require('../config');
const logger = require('../logger');

const addCORSHdr = async (ctx, next) => {
    logger.debug(`${ctx.state.uuid} - Access-Control-Allow-Origin: ${config.server.corsallow}`);    
	ctx.response.set('Access-Control-Allow-Origin',config.server.corsallow);
    await next();
};

module.exports = addCORSHdr;