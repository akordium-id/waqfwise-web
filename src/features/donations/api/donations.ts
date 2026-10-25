import apiClient from '../../../services/api/client'
import type { CreateDonationPayload, CreateDonationResponse } from '../types'

export async function createDonation(
  payload: CreateDonationPayload,
): Promise<CreateDonationResponse> {
  const { data } = await apiClient.post<CreateDonationResponse>('/api/v1/donations', payload)
  return data
}
