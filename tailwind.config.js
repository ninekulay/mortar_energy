// tailwind.config.js
module.exports = {
  // mode: 'jit',
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './src/views/web-base/*.{vue,js,ts,jsx,tsx,html}', './src/views/web-base/**/*.{vue,js,ts,jsx,tsx,html}'],
  safelist: [
    // Safelist all background colors
    {
      pattern: /bg-(red|green|blue|yellow|purple|pink|indigo|gray|teal|emerald|lime|orange|rose|slate|zinc)-(100|200|300|400|500|600|700|800|900)/
    },
    // Safelist all text colors
    {
      pattern: /text-(red|green|blue|yellow|purple|pink|indigo|gray|teal|emerald|lime|orange|rose|slate|zinc)-(100|200|300|400|500|600|700|800|900)/
    }
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '1820px', // Adjust the size as per your requirement
        '4xl': '2560px'
      },
      // colors: {
      //   green: {
      //     50: 'rgb(240 253 244)',
      //     100: 'rgb(220 252 231)',
      //     200: 'rgb(187 247 208)',
      //     300: 'rgb(134 239 172)',
      //     400: 'rgb(74 222 128)',
      //     500: 'rgb(34 197 94)',
      //     600: 'rgb(22 163 74)',
      //     700: 'rgb(21 128 61)',
      //     800: 'rgb(22 101 52)',
      //     900: 'rgb(20 83 45)',
      //     950: 'rgb(5 46 22)'
      //   }
      // }
      colors: {
        alarm: {
          500: '#E9280E'
        }
      }
    },
    fontSize: {
      xxs: '12px',
      xs: '12px',
      sm: '0.8rem',
      base: '1rem',
      md: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    },
    scale: {
      115: '1.15',
      120: '1.20'
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
