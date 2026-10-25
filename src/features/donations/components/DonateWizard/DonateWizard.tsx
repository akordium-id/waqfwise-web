import { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { donationSchema, type DonationFormData } from '../../schemas/donationSchema'
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

  const stepSchemas = {
    0: donationSchema.pick({ amount: true }),
    1: donationSchema.pick({ donor_name: true, donor_email: true }),
    2: donationSchema.pick({ payment_method: true }),
  }

  const canNext = () => {
    if (activeStep === steps.length - 1) return true
    const schema = stepSchemas[activeStep as keyof typeof stepSchemas]
    return schema.safeParse(formData).success
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const result = donationSchema.safeParse(formData)
      if (!result.success) return
      onSubmit(formData)
    } else {
      if (!canNext()) return
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
