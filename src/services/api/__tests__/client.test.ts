import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import apiClient from '../client'

vi.mock('axios', () => {
  const responseUse = vi.fn()
  const requestUse = vi.fn()
  const instance = {
    interceptors: {
      response: { use: responseUse },
      request: { use: requestUse },
    },
    get: vi.fn(),
    post: vi.fn(),
    defaults: { baseURL: 'http://localhost:8085', headers: {} },
  }
  return {
    default: {
      create: vi.fn(() => instance),
      __responseUse: responseUse,
      __requestUse: requestUse,
    },
  }
})

const mockedAxios = axios as unknown as {
  create: ReturnType<typeof vi.fn>
  __responseUse: ReturnType<typeof vi.fn>
}

describe('apiClient', () => {
  it('exports an axios instance with the default baseURL', () => {
    expect(mockedAxios.create).toHaveBeenCalledTimes(1)
    expect(apiClient.defaults.baseURL).toBe('http://localhost:8085')
  })

  it('registers a response interceptor', () => {
    expect(mockedAxios.__responseUse).toHaveBeenCalledTimes(1)
  })

  it('normalizes errors from response.data.error', async () => {
    const errorHandler = mockedAxios.__responseUse.mock.calls[0]?.[1]
    expect(typeof errorHandler).toBe('function')
    await expect(errorHandler({ response: { data: { error: 'boom' } } })).rejects.toThrow('boom')
  })

  it('falls back to error.message', async () => {
    const errorHandler = mockedAxios.__responseUse.mock.calls[0]?.[1]
    await expect(errorHandler({ message: 'timeout' })).rejects.toThrow('timeout')
  })

  it('falls back to Network error', async () => {
    const errorHandler = mockedAxios.__responseUse.mock.calls[0]?.[1]
    await expect(errorHandler({})).rejects.toThrow('Network error')
  })
})
