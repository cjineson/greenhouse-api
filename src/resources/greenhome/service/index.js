'use strict';
const fetch = require("node-fetch");
const querystring = require('querystring');
const config = require('../../../config');
const logger = require('../../../logger');

async function searchPostcode(ctx) {
	let postcode = decodeURI(ctx.url).match(/([A-Z,a-z,0-9 ])*$/g)[0];
	logger.info(`Searching postcode: ${postcode}`);
	const url = "http://epc.opendatacommunities.org/api/v1/domestic/search?postcode=" + encodeURI(postcode)
	console.log `apitoken: ${config.apitoken}`
	var headers = {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Authorization": "Basic " + config.apitoken
	}

	let json_response = ''
	try {
		const response = await fetch(url, {headers: headers})
		json_response = await response.json();
	} catch (error) {
		console.log(error);
	}

	return(json_response);
}

async function searchAddress(ctx) {
	let query = querystring.parse(ctx.url.replace("/searchAddress?",""))
	let address = (query.address);
	let postcode = (query.postcode);
	logger.info(`Searching postcode/address: ${postcode}/${address}`);
	const url = `http://epc.opendatacommunities.org/api/v1/domestic/search?address=${encodeURI(address)}&postcode=${encodeURI(postcode)}` 
	
	var headers = {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Authorization": "Basic " + config.apitoken
	}

	let json_response = ''
	try {
		const response = await fetch(url, {headers: headers})
		json_response = await response.json();
	} catch (error) {
		console.log(error);
	}

	return(json_response);
}

async function searchRecommendations(ctx) {
	let query = querystring.parse(ctx.url.replace("/searchRecommendations?",""))
	let lmkkey = (query.lmkkey);
	logger.info(`Searching lmkkey: ${lmkkey}`);
	const url = `http://epc.opendatacommunities.org/api/v1/domestic/recommendations/${encodeURI(lmkkey)}` 
	
	var headers = {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Authorization": "Basic " + config.apitoken
	}

	let json_response = ''
	try {
		const response = await fetch(url, {headers: headers})
		json_response = await response.json();
	} catch (error) {
		console.log(error);
	}

	return(json_response);
}
module.exports = {
    searchPostcode, searchAddress, searchRecommendations
};
