import { SearchGymsUseCase } from './search-gyms'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('shoud be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'gym-01',
      description: '',
      phone: '',
      latitude: -16.087382,
      longitude: -5.712891,
    })

    await gymsRepository.create({
      name: 'gym-02',
      description: '',
      phone: '',
      latitude: -16.087382,
      longitude: -5.712891,
    })

    const { gyms } = await sut.execute({
      query: 'gym-01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'gym-01' })])
  })

  it('shoud be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `gym-${i}`,
        description: '',
        phone: '',
        latitude: -16.087382,
        longitude: -5.712891,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'gym-21' }),
      expect.objectContaining({ name: 'gym-22' }),
    ])
  })
})
