
const queryValidate = (input: any) => {
	if (!input.message) {
		return { error: 'Message is required' }
	}

  return true
}

export default queryValidate;