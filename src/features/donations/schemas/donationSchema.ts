import { z } from 'zod'

export const donationSchema = z.object({
  amount: z
    .number()
    .positive('Nominal harus lebih dari 0')
    .max(1_000_000_000, 'Maksimal Rp 1.000.000.000'),
  donor_name: z.string().min(2, 'Nama minimal 2 karakter').max(255, 'Nama maksimal 255 karakter'),
  donor_email: z.string().email('Email tidak valid'),
  donor_phone: z
    .string()
    .regex(/^(\+62|62|0)[0-9]{9,13}$/, 'Nomor telepon tidak valid')
    .optional()
    .or(z.literal('')),
  message: z.string().max(500, 'Pesan maksimal 500 karakter').optional(),
  is_anonymous: z.boolean(),
  payment_method: z.enum(['qris', 'bank_transfer', 'ewallet', 'va'], {
    errorMap: () => ({ message: 'Pilih metode pembayaran' }),
  }),
})

export type DonationFormData = z.infer<typeof donationSchema>
