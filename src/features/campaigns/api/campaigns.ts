import apiClient from '../../../services/api/client'
import type { Campaign, CampaignsResponse, CampaignQueryParams } from '../types'

export async function getCampaigns(params: CampaignQueryParams = {}): Promise<CampaignsResponse> {
  const { data } = await apiClient.get<CampaignsResponse>('/api/v1/widget/campaigns', { params })
  return data
}

export async function getCampaignBySlug(
  slug: string,
  params: CampaignQueryParams = {},
): Promise<Campaign | undefined> {
  const response = await getCampaigns({
    limit: 50,
    status: 'active',
    ...params,
  })
  return response.campaigns.find((c) => c.slug === slug)
}
