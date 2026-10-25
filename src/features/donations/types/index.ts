export type PaymentMethod = 'qris' | 'bank_transfer' | 'ewallet' | 'va'

export interface CreateDonationPayload {
  campaign_id: string
  amount: number
  donor_name: string
  donor_email: string
  donor_phone?: string
  message?: string
  is_anonymous: boolean
  payment_method: PaymentMethod
}

export interface CreateDonationResponse {
  donation_id: string
  payment_url: string
  status: string
}
