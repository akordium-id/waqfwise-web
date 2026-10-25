import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Radio from '@mui/material/Radio'
import type { PaymentMethod } from '../../types'

export interface PaymentStepProps {
  value: PaymentMethod | ''
  onChange: (method: PaymentMethod) => void
}

const paymentOptions: {
  value: PaymentMethod
  label: string
  desc: string
}[] = [
  { value: 'qris', label: 'QRIS', desc: 'Scan QR code dengan e-wallet apa saja' },
  { value: 'bank_transfer', label: 'Transfer Bank', desc: 'BCA, Mandiri, BNI, BRI' },
  { value: 'ewallet', label: 'E-Wallet', desc: 'GoPay, OVO, DANA, ShopeePay' },
  { value: 'va', label: 'Virtual Account', desc: 'Bayar kapan saja via ATM/mobile banking' },
]

export default function PaymentStep({ value, onChange }: PaymentStepProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Metode Pembayaran
      </Typography>
      {paymentOptions.map((option) => (
        <Card
          key={option.value}
          sx={{
            mb: 1.5,
            border: value === option.value ? 2 : 1,
            borderColor: value === option.value ? 'primary.main' : 'divider',
            cursor: 'pointer',
          }}
          onClick={() => onChange(option.value)}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
            <Radio checked={value === option.value} />
            <Box>
              <Typography variant="subtitle1">{option.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option.desc}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
