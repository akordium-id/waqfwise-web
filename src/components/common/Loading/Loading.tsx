import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
}

const sizeMap = { small: 24, medium: 40, large: 64 }

export default function Loading({ size = 'medium' }: LoadingProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <CircularProgress size={sizeMap[size]} />
    </Box>
  )
}
