import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

export interface AmountStepProps {
  value: number
  onChange: (amount: number) => void
}

const presetAmounts = [50000, 100000, 250000, 500000, 1000000, 2500000]

export default function AmountStep({ value, onChange }: AmountStepProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Pilih Nominal Donasi
      </Typography>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {presetAmounts.map((amount) => (
          <Grid item key={amount}>
            <Chip
              label={`Rp ${amount.toLocaleString('id-ID')}`}
              onClick={() => onChange(amount)}
              color={value === amount ? 'primary' : 'default'}
              variant={value === amount ? 'filled' : 'outlined'}
              sx={{ fontSize: 14, py: 2.5 }}
            />
          </Grid>
        ))}
      </Grid>
      <TextField
        label="Nominal lainnya"
        type="number"
        fullWidth
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        InputProps={{
          startAdornment: <Typography sx={{ mr: 1 }}>Rp</Typography>,
        }}
      />
    </Box>
  )
}
