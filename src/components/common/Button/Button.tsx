import MuiButton from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button'

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean
}

export default function Button({ loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <MuiButton disabled={disabled || loading} {...props}>
      {loading && <CircularProgress size={16} sx={{ mr: 1 }} color="inherit" />}
      {children}
    </MuiButton>
  )
}
