import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import type { DonationFormData } from '../../schemas/donationSchema'

export interface DonorInfoStepProps {
  value: Pick<
    DonationFormData,
    'donor_name' | 'donor_email' | 'donor_phone' | 'message' | 'is_anonymous'
  >
  onChange: (data: Partial<DonationFormData>) => void
}

export default function DonorInfoStep({ value, onChange }: DonorInfoStepProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informasi Donatur
      </Typography>
      <TextField
        label="Nama Lengkap"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={value.donor_name}
        onChange={(e) => onChange({ donor_name: e.target.value })}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={value.donor_email}
        onChange={(e) => onChange({ donor_email: e.target.value })}
      />
      <TextField
        label="Nomor Telepon (opsional)"
        fullWidth
        sx={{ mb: 2 }}
        value={value.donor_phone || ''}
        onChange={(e) => onChange({ donor_phone: e.target.value })}
      />
      <TextField
        label="Pesan (opsional)"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        value={value.message || ''}
        onChange={(e) => onChange({ message: e.target.value })}
      />
      <FormControlLabel
        control={
          <Switch
            checked={value.is_anonymous}
            onChange={(e) => onChange({ is_anonymous: e.target.checked })}
          />
        }
        label="Sembunyikan nama saya (donasi anonim)"
      />
    </Box>
  )
}
