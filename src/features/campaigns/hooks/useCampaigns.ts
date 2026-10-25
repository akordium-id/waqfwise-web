import { useQuery } from '@tanstack/react-query'
import { getCampaigns, getCampaignBySlug } from '../api/campaigns'
import type { CampaignQueryParams } from '../types'

export function useCampaigns(params: CampaignQueryParams = {}) {
  return useQuery({
    queryKey: ['campaigns', params],
    queryFn: () => getCampaigns(params),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCampaign(slug: string) {
  return useQuery({
    queryKey: ['campaign', slug],
    queryFn: () => getCampaignBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}
