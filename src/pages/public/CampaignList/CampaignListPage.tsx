import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { useCampaigns } from '../../../features/campaigns/hooks/useCampaigns'
import CampaignCard from '../../../components/domain/CampaignCard/CampaignCard'
import type { CampaignType } from '../../../features/campaigns/types'

const typeOptions = [
  { value: '', label: 'Semua Tipe' },
  { value: 'land', label: 'Tanah' },
  { value: 'building', label: 'Bangunan' },
  { value: 'cash', label: 'Kas' },
  { value: 'education', label: 'Pendidikan' },
  { value: 'healthcare', label: 'Kesehatan' },
  { value: 'general', label: 'Umum' },
]

const sortOptions = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'featured', label: 'Unggulan' },
]

export default function CampaignListPage() {
  const navigate = useNavigate()
  const [type, setType] = useState<CampaignType | ''>('')
  const [sort, setSort] = useState('newest')
  const [search, setSearch] = useState('')

  const { data, isLoading, isSuccess } = useCampaigns({
    types: type || undefined,
    limit: 12,
    status: 'active',
  })

  const campaigns = (data?.campaigns || []).filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Kampanye Wakaf
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          label="Cari kampanye"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <TextField
          select
          label="Tipe"
          size="small"
          value={type}
          onChange={(e) => setType(e.target.value as CampaignType | '')}
          sx={{ minWidth: 150 }}
        >
          {typeOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Urutkan"
          size="small"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {isLoading && <Skeleton role="progressbar" variant="rectangular" height={340} />}

      {isSuccess && campaigns.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Belum ada kampanye
          </Typography>
        </Box>
      )}

      {isSuccess && campaigns.length > 0 && (
        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign.id}>
              <CampaignCard
                campaign={campaign}
                onClick={() => navigate(`/campaigns/${campaign.slug}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
