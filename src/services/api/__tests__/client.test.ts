import { describe, it, expect, vi, afterEach } from 'vitest'
import apiClient from '../client'

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios')
  return {
    default: {
      create: vi.fn(() => ({
        interceptors: {
          response: { use: vi.fn() },
          request: { use: vi.fn() },
        },
        get: vi.fn(),
        post: vi.fn(),
        defaults: { baseURL: 'http://localhost:8085' },
      })),
      AxiosError: actual.AxiosError,
    },
  }
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('apiClient', () => {
  it('has correct default baseURL', () => {
    expect(apiClient.defaults.baseURL).toBe('http://localhost:8085')
  })
})
