import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCampaigns, useCampaign } from '../hooks/useCampaigns'
import type { ReactNode } from 'react'

vi.mock('../api/campaigns', () => ({
  getCampaigns: vi.fn(),
  getCampaignBySlug: vi.fn(),
}))

import { getCampaigns, getCampaignBySlug } from '../api/campaigns'

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

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return Wrapper
}

describe('useCampaigns', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns campaigns data', async () => {
    vi.mocked(getCampaigns).mockResolvedValue({
      campaigns: mockCampaigns,
      meta: { total: 1, limit: 6 },
    })

    const { result } = renderHook(() => useCampaigns({ limit: 6 }), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.campaigns).toHaveLength(1)
  })
})

describe('useCampaign', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a single campaign by slug', async () => {
    vi.mocked(getCampaignBySlug).mockResolvedValue(mockCampaigns[0])

    const { result } = renderHook(() => useCampaign('masjid-baru'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.slug).toBe('masjid-baru')
  })
})
