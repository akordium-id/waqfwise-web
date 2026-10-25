import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '../../common/Button/Button'
import Card from '../../common/Card/Card'
import ProgressBar from '../ProgressBar/ProgressBar'
import type { Campaign } from '../../../features/campaigns/types'

const typeLabels: Record<string, string> = {
  land: 'Tanah',
  building: 'Bangunan',
  cash: 'Kas',
  education: 'Pendidikan',
  healthcare: 'Kesehatan',
  general: 'Umum',
}

export interface CampaignCardProps {
  campaign: Campaign
  onClick: () => void
}

export default function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  return (
    <Card onClick={onClick} role="article">
      {campaign.image_url ? (
        <CardMedia component="img" height="180" image={campaign.image_url} alt={campaign.title} />
      ) : (
        <Box sx={{ height: 180, bgcolor: 'primary.light', opacity: 0.3 }} />
      )}
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Chip
            label={typeLabels[campaign.type] || campaign.type}
            size="small"
            color="primary"
            variant="outlined"
          />
          {campaign.is_urgent && <Chip label="Urgent" size="small" color="error" />}
        </Box>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {campaign.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {campaign.short_desc}
        </Typography>
        <ProgressBar value={campaign.progress} showLabel />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1,
            mb: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Rp {campaign.current_amount.toLocaleString('id-ID')} / Rp{' '}
            {campaign.goal_amount.toLocaleString('id-ID')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {campaign.donor_count} donatur
          </Typography>
        </Box>
        <Button variant="contained" fullWidth>
          Donasi Sekarang
        </Button>
      </CardContent>
    </Card>
  )
}
