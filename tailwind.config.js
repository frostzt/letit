const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    screens: {
      hd: '1920px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
