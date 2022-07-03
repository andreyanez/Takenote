/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#E9ECEF',
				secondary: '#CED4DA',
				secondarytwo: '#232E54',
				neutral: '#343A40',
				neutraltwo: '#212529',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		// ...
	],
};
