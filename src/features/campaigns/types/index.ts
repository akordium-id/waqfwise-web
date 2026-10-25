export type CampaignType = 'land' | 'building' | 'cash' | 'education' | 'healthcare' | 'general'

export interface Campaign {
  id: string
  title: string
  slug: string
  short_desc: string
  type: CampaignType
  goal_amount: number
  current_amount: number
  donor_count: number
  image_url?: string
  progress: number
  is_urgent: boolean
  is_featured: boolean
  donate_url: string
}

export interface CampaignsResponse {
  campaigns: Campaign[]
  meta: {
    total: number
    limit: number
  }
}

export interface CampaignQueryParams {
  mosque_slug?: string
  limit?: number
  types?: string
  status?: string
}
