const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
const config = require('./config');
const logger = require('./logger');
var fs = require('fs');
var path = require('path');

const middleware = require('./middleware');
const resources = require('./resources');

middleware.setup(app);
app.use(resources.routes(), resources.allowedMethods());

if (config.server.isHTTPSEnabled) {
	if (!config.server.privateKey) throw Error("No Private Key file specified");
	if (!config.server.privateKeyPass) throw Error("No Private Key Passphrase specified");
	if (!config.server.serverCert) throw Error("No Server Cert file specified");
	
	if (config.server.isMutualTLS) {
		if (!config.server.caCerts) throw Error("No CA Certs file specified");
		var caChain = [];
        var lines = fs.readFileSync(path.resolve('.', config.server.caCerts)).toString().split('\n');
        var cert = [];
        for (var i = 0; i < lines.length; i++) {
            cert.push(lines[i]);
            if (lines[i].match(/-END CERTIFICATE-/)) {
                caChain.push(cert.join('\n'));
                cert = [];
            }
        }
	}
		
	var sslOpts = {
		key: fs.readFileSync(path.resolve('.', config.server.privateKey)),
	    cert: fs.readFileSync(path.resolve('.', config.server.serverCert)),
	    ca: caChain,
	    passphrase: config.server.privateKeyPass,
	    requestCert: config.server.isMutualTLS
	};

	server = https.createServer(sslOpts,app.callback())
} 
else server = http.createServer(app.callback());


module.exports = server.listen(config.server.port, err => {
    if (err) {
        logger.error('Failed to start server', err);
        throw err;
    }
    logger.info(config.server.isHTTPSEnabled?'HTTPS':'HTTP' + ' server started on port ' + config.server.port);
    logger.info(`Hit ${config.server.isHTTPSEnabled?'https':'http'}://localhost:${config.server.port} to verify app version`);
    logger.info(`Note access from local greenhouse-ui React App requires entry in /etc/hosts for local test due to corsallow: ${config.server.corsallow},  e.g.`);
    logger.info(`echo '127.0.0.1 greenhouse.chrisineson.com' >> /etc/hosts`);
});
