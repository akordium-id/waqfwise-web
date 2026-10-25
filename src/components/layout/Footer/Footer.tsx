import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.100', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} WaqfWise. Platform Manajemen Wakaf Modern.
        </Typography>
      </Container>
    </Box>
  )
}
