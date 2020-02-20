const nconf = require('nconf');
const path = require('path');

nconf.argv();
nconf.env('__');
nconf.file('fileenv', { file: path.join(__dirname, '..', 'config', `config.${process.env.NODE_ENV}.json`) });
nconf.file('filemain', { file: path.join(__dirname, '..', 'config', 'config.json') });

module.exports = nconf.get();
