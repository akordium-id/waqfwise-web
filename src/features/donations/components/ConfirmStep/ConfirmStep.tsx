import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import type { DonationFormData } from '../../schemas/donationSchema'

export interface ConfirmStepProps {
  data: DonationFormData
}

const paymentLabels: Record<string, string> = {
  qris: 'QRIS',
  bank_transfer: 'Transfer Bank',
  ewallet: 'E-Wallet',
  va: 'Virtual Account',
}

export default function ConfirmStep({ data }: ConfirmStepProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Konfirmasi Donasi
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Nominal</Typography>
          <Typography variant="subtitle1">Rp {data.amount.toLocaleString('id-ID')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Nama</Typography>
          <Typography>{data.is_anonymous ? 'Anonim' : data.donor_name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Email</Typography>
          <Typography>{data.donor_email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Pembayaran</Typography>
          <Typography>{paymentLabels[data.payment_method] || data.payment_method}</Typography>
        </Box>
        {data.message && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">Pesan</Typography>
            <Typography>{data.message}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
