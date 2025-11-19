import { Box, Container, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTranslation } from 'react-i18next'
import theme from './theme/theme'

function App() {
  const { t } = useTranslation()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            {t('common.welcome')}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {t('common.description')}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
