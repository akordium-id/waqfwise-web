import { createTheme } from '@mui/material/styles'

// Islamic-inspired color palette
const colors = {
  // Teal shades (Islamic architecture, mosques)
  teal: {
    main: '#009688', // Primary teal
    light: '#4DB6AC',
    dark: '#00796B',
    darker: '#004D40',
  },
  // Gold shades (Islamic art, calligraphy)
  gold: {
    main: '#D4AF37', // Classic gold
    light: '#F9D77E',
    dark: '#AA8A2E',
  },
  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    gray: '#BDBDBD',
    darkGray: '#616161',
    black: '#212121',
  },
}

// Create custom Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: colors.teal.main,
      light: colors.teal.light,
      dark: colors.teal.dark,
      contrastText: colors.neutral.white,
    },
    secondary: {
      main: colors.gold.main,
      light: colors.gold.light,
      dark: colors.gold.dark,
      contrastText: colors.neutral.black,
    },
    background: {
      default: colors.neutral.white,
      paper: colors.neutral.lightGray,
    },
    text: {
      primary: colors.neutral.black,
      secondary: colors.neutral.darkGray,
    },
    success: {
      main: '#4CAF50',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: colors.teal.light,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: colors.neutral.black,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.neutral.black,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
})

export default theme
export { colors }
