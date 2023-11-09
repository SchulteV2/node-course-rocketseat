import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'

describe('nearby gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to find nearby gyms', async () => {
    await request(app.server).post('/gyms').send({
      name: 'gym-01',
      description: 'gym-01-test',
      phone: '49999999',
      latitude: -27.2892852,
      longitude: -49.6401091,
    })
    await request(app.server).post('/gyms').send({
      name: 'gym-01',
      description: 'gym-02-test',
      phone: '49999999',
      latitude: -27.003595,
      longitude: -51.145752,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401891,
    })
  })
})
