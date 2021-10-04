// const fetch = require("node-fetch").default;
import fetch from "node-fetch";

const API_ENDPOINT = "https://www.mexc.com/open/api/v2/market/ticker";

exports.handler = async (event, context) => {
	try {
		const response = await fetch(API_ENDPOINT, {
			headers: {
				Accept: "application/json",
			},
		});
		const data = await response.json();
		return { statusCode: 200, body: JSON.stringify({ data }) };
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed fetching data" }),
		};
	}
};
