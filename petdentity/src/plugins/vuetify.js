// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/scss/variables.scss'

// Vuetify
import { createVuetify } from 'vuetify'

const darkTheme = {
  dark: true,
  colors: {
    background: '#000000',
    surface: '#1a1a1a',
    // primary: '#FADA3A',
    primary: '#FFCC33',
    'primary-darken-1': '#3700B3',
    secondary: '#FFFFFF',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
}

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        darkTheme
      }
    }
  }
)
