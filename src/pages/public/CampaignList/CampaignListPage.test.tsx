import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import CampaignListPage from './CampaignListPage'

vi.mock('../../../features/campaigns/hooks/useCampaigns', () => ({
  useCampaigns: vi.fn(),
}))

import { useCampaigns } from '../../../features/campaigns/hooks/useCampaigns'

const mockCampaigns = [
  {
    id: '1',
    title: 'Masjid Baru',
    slug: 'masjid-baru',
    short_desc: 'Bangun masjid',
    type: 'building' as const,
    goal_amount: 1000000,
    current_amount: 500000,
    donor_count: 10,
    progress: 50,
    is_urgent: false,
    is_featured: true,
    donate_url: 'https://waqfwise.id/donate/masjid-baru',
  },
]

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CampaignListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('CampaignListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state initially', () => {
    vi.mocked(useCampaigns).mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof useCampaigns>)

    renderPage()
    expect(screen.getByRole('progressbar')).toBeDefined()
  })

  it('renders campaign cards when data loads', async () => {
    vi.mocked(useCampaigns).mockReturnValue({
      data: { campaigns: mockCampaigns, meta: { total: 1, limit: 6 } },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof useCampaigns>)

    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Masjid Baru')).toBeDefined()
    })
  })

  it('shows empty state when no campaigns', () => {
    vi.mocked(useCampaigns).mockReturnValue({
      data: { campaigns: [], meta: { total: 0, limit: 6 } },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof useCampaigns>)

    renderPage()
    expect(screen.getByText('Belum ada kampanye')).toBeDefined()
  })
})
