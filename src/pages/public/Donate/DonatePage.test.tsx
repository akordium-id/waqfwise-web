import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DonatePage from './DonatePage'

vi.mock('../../../features/campaigns/hooks/useCampaigns', () => ({
  useCampaign: vi.fn(),
}))
vi.mock('../../../features/donations/hooks/useCreateDonation', () => ({
  useCreateDonation: vi.fn(),
}))

import { useCampaign } from '../../../features/campaigns/hooks/useCampaigns'
import { useCreateDonation } from '../../../features/donations/hooks/useCreateDonation'

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
  is_urgent: false,
  is_featured: true,
  donate_url: 'https://waqfwise.id/donate/bangun-masjid',
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/campaigns/bangun-masjid/donate']}>
        <Routes>
          <Route path="/campaigns/:slug/donate" element={<DonatePage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('DonatePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders wizard with campaign title', async () => {
    vi.mocked(useCampaign).mockReturnValue({
      data: mockCampaign,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useCampaign>)
    vi.mocked(useCreateDonation).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useCreateDonation>)

    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Donasi untuk Bangun Masjid')).toBeDefined()
    })
  })

  it('navigates through wizard steps', async () => {
    vi.mocked(useCampaign).mockReturnValue({
      data: mockCampaign,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useCampaign>)
    vi.mocked(useCreateDonation).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useCreateDonation>)

    renderPage()

    // Step 1: Amount — click preset
    await waitFor(() => {
      expect(screen.getByText('Pilih Nominal Donasi')).toBeDefined()
    })
    fireEvent.click(screen.getByText('Rp 100.000'))
    fireEvent.click(screen.getByText('Lanjut'))

    // Step 2: Donor Info
    await waitFor(() => {
      expect(screen.getByText('Informasi Donatur')).toBeDefined()
    })
    fireEvent.change(screen.getByLabelText('Nama Lengkap *'), {
      target: { value: 'Budi' },
    })
    fireEvent.change(screen.getByLabelText('Email *'), {
      target: { value: 'budi@example.com' },
    })
    fireEvent.click(screen.getByText('Lanjut'))

    // Step 3: Payment
    await waitFor(() => {
      expect(screen.getByText('Metode Pembayaran')).toBeDefined()
    })
    fireEvent.click(screen.getByText('QRIS'))
    fireEvent.click(screen.getByText('Lanjut'))

    // Step 4: Confirm
    await waitFor(() => {
      expect(screen.getByText('Konfirmasi Donasi')).toBeDefined()
    })
    expect(screen.getByText('Rp 100.000')).toBeDefined()
    expect(screen.getByText('Budi')).toBeDefined()
  })
})
