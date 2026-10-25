import MuiCard from '@mui/material/Card'
import type { CardProps as MuiCardProps } from '@mui/material/Card'

export interface CardProps extends MuiCardProps {
  onClick?: () => void
}

export default function Card({ children, onClick, ...props }: CardProps) {
  return (
    <MuiCard
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': onClick ? { transform: 'translateY(-2px)', boxShadow: 4 } : undefined,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  )
}
