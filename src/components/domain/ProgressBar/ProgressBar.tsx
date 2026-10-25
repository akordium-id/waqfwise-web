import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

export interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
}

export default function ProgressBar({ value, max = 100, showLabel = true }: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'grey.200',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor: 'primary.main',
          },
        }}
      />
      {showLabel && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {percentage.toFixed(0)}%
        </Typography>
      )}
    </Box>
  )
}
