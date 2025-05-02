
const getQueryPrompt = (message: string) => {
	const prompt = `
		You are a smart assistant that converts user requests into JSON commands for a restaurant search system.
		Follow this schema strictly:

		{
			"action": "restaurant_search",
			"parameters": {
				"query": "<type of food or cuisine>",
				"near": "<location or neighborhood>",
				"price": "<1 to 4, where 1 is cheapest and 4 is most expensive>",
				"open_now": <true or false>
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