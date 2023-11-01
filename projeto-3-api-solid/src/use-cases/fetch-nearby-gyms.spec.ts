import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { beforeEach, describe, expect, it } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('fetch nearby gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: `nearby-gym`,
      description: '',
      phone: '',
      latitude: -27.2892852,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      name: `far-gym`,
      description: '',
      phone: '',
      latitude: -27.003595,
      longitude: -51.145752,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401891,
    })

    expect(gyms).toEqual([expect.objectContaining({ name: 'nearby-gym' })])
  })
})
