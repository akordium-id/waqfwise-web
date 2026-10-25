import { test, expect } from '@playwright/test'

test.describe('Campaign Flow', () => {
  test('list → detail → donate wizard', async ({ page }) => {
    await page.goto('/campaigns')
    await expect(page.getByText('Kampanye Wakaf')).toBeVisible()

    // Click first campaign card
    const firstCard = page.getByRole('article').first()
    await firstCard.click()

    // Detail page
    await expect(page).toHaveURL(/\/campaigns\/.+/)
    await expect(page.getByText('Donasi Sekarang')).toBeVisible()

    // Go to donate
    await page.getByText('Donasi Sekarang').click()
    await expect(page).toHaveURL(/\/donate$/)

    // Step 1: Amount
    await expect(page.getByText('Pilih Nominal Donasi')).toBeVisible()
    await page.getByText('Rp 100.000').click()
    await page.getByText('Lanjut').click()

    // Step 2: Donor info
    await expect(page.getByText('Informasi Donatur')).toBeVisible()
    await page.getByLabel('Nama Lengkap').fill('Budi Santoso')
    await page.getByLabel('Email').fill('budi@example.com')
    await page.getByText('Lanjut').click()

    // Step 3: Payment
    await expect(page.getByText('Metode Pembayaran')).toBeVisible()
    await page.getByText('QRIS').click()
    await page.getByText('Lanjut').click()

    // Step 4: Confirm
    await expect(page.getByText('Konfirmasi Donasi')).toBeVisible()
    await expect(page.getByText('Rp 100.000')).toBeVisible()
    await expect(page.getByText('Budi Santoso')).toBeVisible()
  })
})
