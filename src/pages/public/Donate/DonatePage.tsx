import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import { useCampaign } from '../../../features/campaigns/hooks/useCampaigns'
import { useCreateDonation } from '../../../features/donations/hooks/useCreateDonation'
import DonateWizard from '../../../features/donations/components/DonateWizard/DonateWizard'
import type { DonationFormData } from '../../../features/donations/schemas/donationSchema'

export default function DonatePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: campaign, isLoading } = useCampaign(slug || '')
  const createDonation = useCreateDonation()

  const handleSubmit = (data: DonationFormData) => {
    if (!campaign) return
    createDonation.mutate(
      {
        campaign_id: campaign.id,
        amount: data.amount,
        donor_name: data.donor_name,
        donor_email: data.donor_email,
        donor_phone: data.donor_phone || undefined,
        message: data.message || undefined,
        is_anonymous: data.is_anonymous,
        payment_method: data.payment_method,
      },
      {
        onSuccess: (res) => {
          if (res.payment_url) {
            window.location.href = res.payment_url
          }
        },
      },
    )
  }

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="text" height={48} />
        <Skeleton variant="rectangular" height={400} sx={{ mt: 2 }} />
      </Container>
    )
  }

  if (!campaign) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Kampanye tidak ditemukan
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Donasi untuk {campaign.title}
      </Typography>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <DonateWizard onSubmit={handleSubmit} isSubmitting={createDonation.isPending} />
        </CardContent>
      </Card>
    </Container>
  )
}
