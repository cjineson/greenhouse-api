const greenhomeService = require('./service');

const searchPostcode = async (ctx) => {
    ctx.body = await greenhomeService.searchPostcode(ctx);
}

const searchAddress = async (ctx) => {
    ctx.body = await greenhomeService.searchAddress(ctx);
}

const searchRecommendations = async (ctx) => {
    ctx.body = await greenhomeService.searchRecommendations(ctx);
}

module.exports = {
    searchPostcode, searchAddress, searchRecommendations
};
