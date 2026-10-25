import { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import type { DonationFormData } from '../../schemas/donationSchema'
import AmountStep from '../AmountStep/AmountStep'
import DonorInfoStep from '../DonorInfoStep/DonorInfoStep'
import PaymentStep from '../PaymentStep/PaymentStep'
import ConfirmStep from '../ConfirmStep/ConfirmStep'

const steps = ['Nominal', 'Data Diri', 'Pembayaran', 'Konfirmasi']

export interface DonateWizardProps {
  onSubmit: (data: DonationFormData) => void
  isSubmitting?: boolean
}

export default function DonateWizard({ onSubmit, isSubmitting = false }: DonateWizardProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<DonationFormData>({
    amount: 0,
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    message: '',
    is_anonymous: false,
    payment_method: 'qris',
  })

  const updateData = (data: Partial<DonationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const canNext = () => {
    switch (activeStep) {
      case 0:
        return formData.amount > 0
      case 1:
        return (
          formData.donor_name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donor_email)
        )
      case 2:
        return !!formData.payment_method
      default:
        return true
    }
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onSubmit(formData)
    } else {
      setActiveStep((s) => s + 1)
    }
  }

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <AmountStep value={formData.amount} onChange={(amount) => updateData({ amount })} />
      )}
      {activeStep === 1 && <DonorInfoStep value={formData} onChange={updateData} />}
      {activeStep === 2 && (
        <PaymentStep
          value={formData.payment_method}
          onChange={(method) => updateData({ payment_method: method })}
        />
      )}
      {activeStep === 3 && <ConfirmStep data={formData} />}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
          Kembali
        </Button>
        <Button variant="contained" disabled={!canNext() || isSubmitting} onClick={handleNext}>
          {activeStep === steps.length - 1
            ? isSubmitting
              ? 'Memproses...'
              : 'Donasi Sekarang'
            : 'Lanjut'}
        </Button>
      </Box>
    </Box>
  )
}
