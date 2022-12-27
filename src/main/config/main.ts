export const config = {
	server: {
		port: process.env.PORT || 5050,
	},
	analytics: {
		intercom: {
			apiKey: process.env.INTERCOM_API_KEY,
		},
	},
};
