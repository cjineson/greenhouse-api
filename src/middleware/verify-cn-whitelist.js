'use strict';

const logger = require('../logger');
const config = require('../config');

const verifyCNWhitelist = async (ctx, next) => {
    
    if (config.server.isHTTPSEnabled 
        && config.server.isMutualTLS 
        && config.server.isCNWhitelist) {

        logger.debug(`${ctx.state.uuid} - CN name check is enabled`);
        let cert = ctx.req.connection.getPeerCertificate();
        
        if (cert && cert.subject) {
            let cn = cert.subject.CN.toLowerCase();
            logger.debug(`${ctx.state.uuid} - Peer Client Cert CN: ${cn}`);
            let cnlist = config.server.cnWhitelist.toLowerCase().split(",");
            
            if (cnlist.includes(cn)) {
                logger.debug(`${ctx.state.uuid} - CN name verified successfully`);
                return next();
            } else {
                let error = new Error('Unauthorized CN Names');
                logger.error(`${ctx.state.uuid} - ${error}`);
                return next(error);
            }
        } else {
            let error = new Error('Cert/CN names unavailable');
            logger.error(`${ctx.state.uuid} - ${error}`);
            return next(error);
        }
    } else {
        logger.debug(`${ctx.state.uuid} - CN name check is disabled`);
        return next();
    }
};

module.exports = verifyCNWhitelist;

