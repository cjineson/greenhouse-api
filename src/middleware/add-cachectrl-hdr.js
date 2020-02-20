'use strict';
const config = require('../config');
const logger = require('../logger');

const addCacheCtrlHdr = async (ctx, next) => {
	const val = 'max-age=0, must-revalidate';
	logger.debug(`${ctx.state.uuid} - Cache-Control: ${val}`);    
	ctx.response.set('Cache-Control',val);
    await next();
};

module.exports = addCacheCtrlHdr;