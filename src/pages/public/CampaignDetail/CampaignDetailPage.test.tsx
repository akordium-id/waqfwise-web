import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CampaignDetailPage from './CampaignDetailPage'

vi.mock('../../../features/campaigns/hooks/useCampaigns', () => ({
  useCampaign: vi.fn(),
}))

import { useCampaign } from '../../../features/campaigns/hooks/useCampaigns'

const mockCampaign = {
  id: '1',
  title: 'Bangun Masjid',
  slug: 'bangun-masjid',
  short_desc: 'Membangun masjid',
  type: 'building' as const,
  goal_amount: 5000000,
  current_amount: 1250000,
  donor_count: 342,
  progress: 25,
  is_urgent: true,
  is_featured: true,
  donate_url: 'https://waqfwise.id/donate/bangun-masjid',
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/campaigns/bangun-masjid']}>
        <Routes>
          <Route path="/campaigns/:slug" element={<CampaignDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('CampaignDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders campaign title', async () => {
    vi.mocked(useCampaign).mockReturnValue({
      data: mockCampaign,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof useCampaign>)

    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Bangun Masjid')).toBeDefined()
    })
  })

  it('renders progress and stats', async () => {
    vi.mocked(useCampaign).mockReturnValue({
      data: mockCampaign,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof useCampaign>)

    renderPage()
    await waitFor(() => {
      expect(screen.getByText('25%')).toBeDefined()
      expect(screen.getByText('342 donatur')).toBeDefined()
    })
  })
})
