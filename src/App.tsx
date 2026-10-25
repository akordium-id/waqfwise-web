import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import theme from './theme/theme'
import AppBar from './components/layout/AppBar/AppBar'
import Footer from './components/layout/Footer/Footer'
import CampaignListPage from './pages/public/CampaignList/CampaignListPage'
import CampaignDetailPage from './pages/public/CampaignDetail/CampaignDetailPage'
import DonatePage from './pages/public/Donate/DonatePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<CampaignListPage />} />
                <Route path="/campaigns" element={<CampaignListPage />} />
                <Route path="/campaigns/:slug" element={<CampaignDetailPage />} />
                <Route path="/campaigns/:slug/donate" element={<DonatePage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
