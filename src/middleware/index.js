'use strict';
const addCORSHdr = require('./add-cors-hdr');
const addCacheCtrlHdr = require('./add-cachectrl-hdr');
const cnWhitelist = require('./verify-cn-whitelist')
const logging = require('./logging');
const errorHandler = require('./error-handler');

const setup = app => {
    app.use(addCORSHdr);
    app.use(addCacheCtrlHdr);    
    app.use(cnWhitelist);
    app.use(logging);
    app.use(errorHandler);
};
module.exports = {
    setup
};
