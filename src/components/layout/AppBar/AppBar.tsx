import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

export default function AppBar() {
  const navigate = useNavigate()
  return (
    <MuiAppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer', flexGrow: 1, fontWeight: 700 }}
          onClick={() => navigate('/')}
        >
          WaqfWise
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/campaigns')}>
            Kampanye
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
