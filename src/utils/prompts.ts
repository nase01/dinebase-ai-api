
const getQueryPrompt = (message: string) => {
	const prompt = `
		You are a smart assistant that converts user requests into JSON commands for a restaurant search system.
		Follow this schema strictly:

		{
			"action": "restaurant_search",
			"parameters": {
				"query": "<type of food or cuisine>",
				"near": "<location or neighborhood>",
				"min_price": <1 to 4, where 1 is most affodable and 4 is most expensive>,
				"max_price": <1 to 4, where 1 is most affodable and 4 is most expensive>,
				"open_now": <true or false>
				"sort": <POPULARITY or RATING, where POPULARITY is the top rated and RATING is default>
			}
		}

		Only return valid JSON. No extra text.
		If user ask any unrelated queries then return this schema

		{
			"action": "unrelated_search",
			"parameters": null
		}

		User input: "${message}"
	`;

  return prompt;
}

export default getQueryPrompt;