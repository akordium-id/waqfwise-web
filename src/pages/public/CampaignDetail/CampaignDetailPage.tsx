import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import { useCampaign } from '../../../features/campaigns/hooks/useCampaigns'
import ProgressBar from '../../../components/domain/ProgressBar/ProgressBar'

const typeLabels: Record<string, string> = {
  land: 'Tanah',
  building: 'Bangunan',
  cash: 'Kas',
  education: 'Pendidikan',
  healthcare: 'Kesehatan',
  general: 'Umum',
}

export default function CampaignDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: campaign, isLoading } = useCampaign(slug || '')

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={300} />
        <Skeleton variant="text" height={48} sx={{ mt: 2 }} />
        <Skeleton variant="text" height={24} sx={{ mt: 1 }} />
      </Container>
    )
  }

  if (!campaign) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Kampanye tidak ditemukan
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <CardMedia
            component="img"
            src={campaign.image_url || ''}
            alt={campaign.title}
            sx={{
              height: 300,
              width: '100%',
              borderRadius: 2,
              objectFit: 'cover',
              bgcolor: 'grey.200',
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Chip
              label={typeLabels[campaign.type] || campaign.type}
              color="primary"
              variant="outlined"
            />
            {campaign.is_urgent && <Chip label="Urgent" color="error" />}
          </Box>
          <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
            {campaign.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {campaign.short_desc}
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 24 }}>
            <CardContent>
              <ProgressBar value={campaign.progress} showLabel />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Rp {campaign.current_amount.toLocaleString('id-ID')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                dari Rp {campaign.goal_amount.toLocaleString('id-ID')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {campaign.donor_count} donatur
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                onClick={() => navigate(`/campaigns/${campaign.slug}/donate`)}
              >
                Donasi Sekarang
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
