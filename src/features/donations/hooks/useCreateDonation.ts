import { useMutation } from '@tanstack/react-query'
import { createDonation } from '../api/donations'
import type { CreateDonationPayload, CreateDonationResponse } from '../types'

export function useCreateDonation() {
  return useMutation<CreateDonationResponse, Error, CreateDonationPayload>({
    mutationFn: createDonation,
  })
}
