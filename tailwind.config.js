const siteConfig = require('./config/site.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        // site.config.js에서 동적으로 로드
        primary: siteConfig.blogTheme.primaryColor,
        secondary: siteConfig.blogTheme.secondaryColor,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}