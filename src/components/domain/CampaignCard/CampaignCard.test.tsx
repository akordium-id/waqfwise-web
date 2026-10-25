import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CampaignCard from './CampaignCard'
import type { Campaign } from '../../../features/campaigns/types'

const mockCampaign: Campaign = {
  id: '1',
  title: 'Bangun Masjid Al-Ikhlas',
  slug: 'bangun-masjid',
  short_desc: 'Membangun masjid 2 lantai',
  type: 'building',
  goal_amount: 500000000,
  current_amount: 125000000,
  donor_count: 342,
  image_url: 'https://example.com/masjid.jpg',
  progress: 25.0,
  is_urgent: false,
  is_featured: true,
  donate_url: 'https://waqfwise.id/donate/bangun-masjid',
}

describe('CampaignCard', () => {
  it('renders campaign title and description', () => {
    render(<CampaignCard campaign={mockCampaign} onClick={() => {}} />)
    expect(screen.getByText('Bangun Masjid Al-Ikhlas')).toBeDefined()
    expect(screen.getByText('Membangun masjid 2 lantai')).toBeDefined()
  })

  it('renders progress percentage', () => {
    render(<CampaignCard campaign={mockCampaign} onClick={() => {}} />)
    expect(screen.getByText('25%')).toBeDefined()
  })

  it('renders donor count', () => {
    render(<CampaignCard campaign={mockCampaign} onClick={() => {}} />)
    expect(screen.getByText('342 donatur')).toBeDefined()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<CampaignCard campaign={mockCampaign} onClick={onClick} />)
    fireEvent.click(screen.getByRole('article'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('shows urgent badge when is_urgent is true', () => {
    render(<CampaignCard campaign={{ ...mockCampaign, is_urgent: true }} onClick={() => {}} />)
    expect(screen.getByText('Urgent')).toBeDefined()
  })
})
